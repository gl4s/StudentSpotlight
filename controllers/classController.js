const ClassModel = require('../models/classModel');
const userModelInstance = require('../models/userModel');


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
      console.log(userModelInstance); //debug
      const teachers = await userModelInstance.getAvailableTeachers();
      res.json({ teachers });
    } catch (error) {
      console.error('Error fetching available teachers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getClassesWithTeachers(req, res) {
    try {
      const classes = await ClassModel.getClassesWithTeachers();
      res.json({ classes });
    } catch (error) {
      console.error('Error fetching classes with teachers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

module.exports = ClassController;
