const SubjectModel = require('../models/subjectModel');

const subjectController = {
  addSubject: async (req, res) => {
    try {
      const { courseName } = req.body;
      const newSubjectId = await SubjectModel.addSubject(courseName);
      res.status(201).json({ message: 'Subject added successfully', courseId: newSubjectId });
    } catch (error) {
      console.error('Error adding subject:', error);
      res.status(500).json({ error: 'Failed to add subject' });
    }
  },

  deleteSubject: async (req, res) => {
    try {
      const { courseId } = req.params;
      await SubjectModel.deleteSubject(courseId);
      res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
      console.error('Error deleting subject:', error);
      res.status(500).json({ error: 'Failed to delete subject' });
    }
  },

  getAllSubjects: async (req, res) => {
    try {
      const subjects = await SubjectModel.getSubjects();
      res.json(subjects);
    } catch (error) {
      console.error('Error retrieving subjects:', error);
      res.status(500).json({ error: 'Failed to retrieve subjects' });
    }
  }
};

module.exports = subjectController;
