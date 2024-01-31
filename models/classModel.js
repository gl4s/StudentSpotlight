const db = require('../db');

class classModel {
  static async addClass(className, schoolId, headTeacherId) {
    let connection;
    try {
      connection = await db.getConnection();

      await connection.beginTransaction();

      // Insert new class
      const insertClassQuery = 'INSERT INTO Classes (ClassName, SchoolID, HeadTeacherID) VALUES (?, ?, ?)';
      const [insertClassRows] = await connection.execute(insertClassQuery, [className, schoolId, headTeacherId]);

      const newClassId = insertClassRows.insertId;

      // Update head teacher's ClassID in Users table
      const updateTeacherQuery = 'UPDATE Users SET ClassID = ? WHERE UserID = ?';
      await connection.execute(updateTeacherQuery, [newClassId, headTeacherId]);

      await connection.commit();

      console.debug('Class added successfully:', newClassId);
      return newClassId;
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      console.error('Error while adding class:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  static async getClassesWithTeachers() {
    try {
      const query = `
        SELECT 
          c.ClassID,
          c.ClassName,
          c.SchoolID,
          u.UserID AS HeadTeacherID,
          u.FirstName AS HeadTeacherFirstName,
          u.LastName AS HeadTeacherLastName
        FROM Classes c
        LEFT JOIN Users u ON c.HeadTeacherID = u.UserID
      `;
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Error getting classes with teachers:', error);
      throw error;
    }
  }

  static async getStudentsBySchoolAndClass(schoolId, classId) {
    try {
      const query = `
        SELECT 
          UserID,
          Username,
          FirstName,
          LastName
        FROM Users
        WHERE SchoolID = ? AND ClassID = ? AND UserType = 'student'
      `;
      const [rows] = await db.query(query, [schoolId, classId]);
      return rows;
    } catch (error) {
      console.error('Error getting students by school and class:', error);
      throw error;
    }
  }
}

module.exports = classModel;
