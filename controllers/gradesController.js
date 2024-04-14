// gradesController.js

const GradesModel = require('../models/gradesModel');

const gradesController = {
    addGrade: async (req, res) => {
        const { teacherId, schoolIdentifier, grade, description } = req.body;
        const studentId = req.params.studentId;
        try {
            const success = await GradesModel.addGrade(studentId, teacherId, schoolIdentifier, grade, description);
            if (success) {
                res.status(200).json({ message: 'Grade added successfully' });
            }
        } catch (error) {
            console.error('Error adding grade:', error);
            res.status(500).json({ error: 'Failed to add grade' });
        }
    },

    getGrades: async (req, res) => {
        const studentId = req.params.studentId;
        console.log(`Fetching grades for studentId: ${studentId}`);
        try {
            const grades = await GradesModel.getGrades(studentId);
            res.status(200).json(grades);
        } catch (error) {
            console.error('Error retrieving grades:', error);
            res.status(500).json({ error: 'Failed to retrieve grades' });
        }
    },

    deleteGrade: async (req, res) => {
        const gradeId = req.params.gradeId;
        try {
            const success = await GradesModel.deleteGrade(gradeId);
            if (success) {
                res.status(200).json({ message: 'Grade deleted successfully' });
            }
        } catch (error) {
            console.error('Error deleting grade:', error);
            res.status(500).json({ error: 'Failed to delete grade' });
        }
    }
};

module.exports = gradesController;
