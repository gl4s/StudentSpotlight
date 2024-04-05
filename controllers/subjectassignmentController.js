const SubjectAssignmentModel = require('../models/subjectassignmentModel');

const subjectAssignmentController = {
  getAllSubjectAssignments: async (req, res) => {
    const requestingSchoolId = req.query.userId;
    try {
      const subjectAssignments = await SubjectAssignmentModel.getAllSubjectAssignments(requestingSchoolId);
      console.log("assignmentek: ",subjectAssignments)
      res.json(subjectAssignments);
    } catch (error) {
      console.error('Error retrieving subject assignments:', error);
      res.status(500).json({ error: 'Failed to retrieve subject assignments' });
    }
  },

  assignSubject: async (req, res) => {
    const { subject, teacher } = req.body;
    try {
      const newAssignmentId = await SubjectAssignmentModel.assignSubject(subject, teacher);
      res.status(201).json({ id: newAssignmentId, message: 'Subject assigned successfully' });
    } catch (error) {
      console.error('Error assigning subject:', error);
      res.status(500).json({ error: 'Failed to assign subject' });
    }
  },

  deleteSubjectAssignment: async (req, res) => {
    const assignmentId = req.params.assignmentId;
    try {
      await SubjectAssignmentModel.deleteSubjectAssignment(assignmentId);
      res.json({ message: 'Subject assignment deleted successfully' });
    } catch (error) {
      console.error('Error deleting subject assignment:', error);
      res.status(500).json({ error: 'Failed to delete subject assignment' });
    }
  },

  getAllTeachers: async (req, res) => {
    const requestingSchoolId = req.query.schoolId;
    try {
      const teachers = await SubjectAssignmentModel.getAllTeachers(requestingSchoolId);
      res.json(teachers);
    } catch (error) {
      console.error('Error retrieving teachers:', error);
      res.status(500).json({ error: 'Failed to retrieve teachers' });
    }
  }

};

module.exports = subjectAssignmentController;
