// gradesModel.js

const db = require('../db');

class GradesModel {
    static async addGrade(studentId, teacherId, schoolIdentifier, CourseID, grade, description) {
        try {
            const schoolAdminQuery = 'SELECT UserID FROM users WHERE Username = ? AND UserType = ?';
            const [schoolAdminRows] = await db.query(schoolAdminQuery, [schoolIdentifier, 'schooladmin']);
            const schoolAdminUserId = schoolAdminRows[0].UserID;

            if (teacherId !== schoolAdminUserId) {
                throw new Error('Teacher is not authorized to add grades for this school');
            }

            const studentQuery = 'SELECT Username FROM users WHERE UserID = ? AND UserType = ?';
            const [studentRows] = await db.query(studentQuery, [studentId, 'student']);
            const studentUsername = studentRows[0].Username;

            const studentSchoolId = studentUsername.split('.')[0];

            if (studentSchoolId !== schoolIdentifier) {
                throw new Error('Student does not belong to the specified school');
            }

            const insertGradeQuery = 'INSERT INTO grades (StudentID, TeacherID, CourseID, Grade, Description) VALUES (?, ?, ?, ?, ?)';
            await db.query(insertGradeQuery, [studentId, teacherId, CourseID, grade, description]);

            console.debug('Grade added successfully');
            return true;
        } catch (error) {
            console.error('Error adding grade:', error);
            throw error;
        }
    }

    static async getGrades(studentId) {
        try {
            const selectGradesQuery = 'SELECT Grade, Description FROM grades WHERE StudentID = ?';
            const [grades] = await db.query(selectGradesQuery, [studentId]);

            console.debug('Grades retrieved successfully:', grades);
            return grades;
        } catch (error) {
            console.error('Error retrieving grades:', error);
            throw error;
        }
    }

    static async deleteGrade(gradeId) {
        try {
            const deleteGradeQuery = 'DELETE FROM grades WHERE GradeID = ?';
            await db.query(deleteGradeQuery, [gradeId]);

            console.debug('Grade deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting grade:', error);
            throw error;
        }
    }
}

module.exports = GradesModel;
