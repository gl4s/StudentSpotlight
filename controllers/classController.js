const ClassModel = require('../models/classModel');

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
}

module.exports = ClassController;
