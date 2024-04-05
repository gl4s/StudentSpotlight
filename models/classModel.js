const db = require('../db');
const UserModel = require('./userModel');

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

  static async getClassesWithTeachers(schoolId) {
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
        WHERE c.SchoolID = ?
      `;
      const [rows] = await db.query(query, [schoolId]);
      return rows;
    } catch (error) {
      console.error('Error getting classes with teachers:', error);
      throw error;
    }
  }



  static async getStudentsByClass(classId) {
    try {
      const query = `
          SELECT 
            UserID,
            Username,
            FirstName,
            LastName
          FROM Users
          WHERE ClassID = ? 
          AND UserType = 'student'
        `;
      const [rows] = await db.query(query, [classId]);
      return rows;
    } catch (error) {
      console.error('Error getting students by class:', error);
      throw error;
    }
  }


  static async addStudentToClass(classId, studentId) {
    try {
      const updateQuery = 'UPDATE Users SET ClassID = ? WHERE UserID = ?';
      await db.query(updateQuery, [classId, studentId]);

      const fetchQuery = 'SELECT * FROM Users WHERE UserID = ?';
      const [student] = await db.query(fetchQuery, [studentId]);

      return student;
    } catch (error) {
      console.error('Error adding student to class:', error);
      throw error;
    }
  }

  static async deleteClass(classId) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();
  
      // Update associated users' ClassID to NULL
      await UserModel.updateUsersClassId(classId);
  
      // Now delete the class
      const deleteClassQuery = 'DELETE FROM Classes WHERE ClassID = ?';
      await connection.execute(deleteClassQuery, [classId]);
  
      await connection.commit();
  
      console.debug('Class deleted successfully:', classId);
      return true;
    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      console.error('Error deleting class:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  static async removeSelectedStudentsFromClass(classId, studentIds) {
    try {

      const query = 'UPDATE Users SET ClassID = NULL WHERE ClassID = ? AND UserID IN (?)';
      await db.query(query, [classId, studentIds]);

      console.debug('Selected students removed from class successfully');
    } catch (error) {
      console.error('Error removing selected students from class:', error);
      throw error;
    }
  }

}

module.exports = classModel;
