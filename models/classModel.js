const pool = require('../db');

class classModel {
  static async addClass(className, schoolId, headTeacherId) {
    try {
      const result = await db.query(
        'INSERT INTO Classes (ClassName, SchoolID, HeadTeacherID) VALUES (?, ?, ?)',
        [className, schoolId, headTeacherId]
      );

      return result.insertId; // Returns the ID of the newly added class
    } catch (error) {
      throw error;
    }
  }
}

module.exports = classModel;
