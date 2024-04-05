const ClassModel = require('../models/classModel');
const userModelInstance = require('../models/userModel');
const UserModel = require('../models/userModel');


class ClassController {
  static async addClass(req, res) {
    const { className, schoolId, headTeacherId } = req.body;

    try {
      const newClassId = await ClassModel.addClass(className, schoolId, headTeacherId);

      res.json({ success: true, newClassId });
    } catch (error) {
      console.error('Error adding class:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async getAvailableTeachers(req, res) {
    try {
      
      const teachers = await userModelInstance.getAvailableTeachers();
      res.json({ teachers });
    } catch (error) {
      console.error('Error fetching available teachers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  static async getAvailableStudents(req, res) {
    try {
      
      const students = await userModelInstance.getAvailableStudents();
      res.json({ students });
    } catch (error) {
      console.error('Error fetching available teachers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getClassesWithTeachers(req, res) {
    try {
      const requestingSchoolId = req.query.userId;
      console.log('Requesting School ID:', requestingSchoolId);
      const classes = await ClassModel.getClassesWithTeachers(requestingSchoolId);
      console.log('Classes:', classes); // Log the classes fetched from the database
      res.json({ classes });
    } catch (error) {
      console.error('Error fetching classes with teachers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


  static async getStudentsByClass(req, res) {
    const { classId } = req.params;

    try {
      const students = await ClassModel.getStudentsByClass(classId);
      res.json({ students });
    } catch (error) {
      console.error('Error fetching students by class:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async addStudentToClass(req, res) {
    const { classId } = req.params;
    const { studentId } = req.body;

    try {
      const student = await ClassModel.addStudentToClass(classId, studentId);

      res.json({ success: true, message: 'Student added to class successfully', student });
    } catch (error) {
      console.error('Error adding student to class:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async deleteClass(req, res) {
    const { classId } = req.params;
    try {
      await ClassModel.deleteClass(classId);

      await UserModel.updateUsersClassId(classId);

      res.status(200).json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
      console.error('Error deleting class:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  static async removeSelectedStudents(req, res) {
    const { classId } = req.params;
    const { studentIds } = req.body;

    try {
      await ClassModel.removeSelectedStudentsFromClass(classId, studentIds);

      res.status(200).json({ success: true, message: 'Selected students removed from class successfully' });
    } catch (error) {
      console.error('Error removing selected students:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

}

module.exports = ClassController;
