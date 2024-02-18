const db = require('../db');

class SubjectAssignmentModel {
    static async assignSubject(subject, teacher) {
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            const insertAssignmentQuery = 'INSERT INTO subjectassignments (TeacherID, Subject) VALUES (?, ?)';
            const [insertAssignmentRows] = await connection.execute(insertAssignmentQuery, [teacher, subject]);

            const newAssignmentId = insertAssignmentRows.insertId;

            await connection.commit();

            console.debug('Subject assigned successfully:', newAssignmentId);
            return newAssignmentId;
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error assigning subject:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async deleteSubjectAssignment(assignmentId) {
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            const deleteAssignmentQuery = 'DELETE FROM subjectassignments WHERE AssignmentID = ?';
            await connection.execute(deleteAssignmentQuery, [assignmentId]);

            await connection.commit();

            console.debug('Subject assignment deleted successfully:', assignmentId);
            return true;
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error deleting subject assignment:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async getAllSubjectAssignments() {
        let connection;
        try {
            connection = await db.getConnection();
    
            const selectAssignmentsQuery = `
                SELECT sa.AssignmentID, s.CourseName, CONCAT(u.FirstName, ' ', u.LastName) as Teacher
                FROM subjectassignments sa
                INNER JOIN users u ON sa.TeacherID = u.UserID
                INNER JOIN subjects s ON sa.Subject = s.CourseID
            `;
            const [assignments] = await connection.execute(selectAssignmentsQuery);
    
            console.debug('Subject assignments retrieved successfully');
            return assignments;
        } catch (error) {
            console.error('Error retrieving subject assignments:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async getAllTeachers(requestingSchoolId) {
        let connection;
        try {
            connection = await db.getConnection();
            let query = 'SELECT * FROM Users WHERE UserType = ? AND Username LIKE ?';
            let queryParams = ['teacher', `${requestingSchoolId}.%.%`];
    
            console.log('Executing query:', query, 'with parameters:', queryParams); // Debug Point
            const [teachers] = await connection.execute(query, queryParams);
            console.log('Teachers retrieved:', teachers); // Debug Point
            return teachers;
        } catch (error) {
            console.error('Error retrieving teachers:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }    
}

module.exports = SubjectAssignmentModel;
