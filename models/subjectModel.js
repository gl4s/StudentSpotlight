const db = require('../db');

class SubjectModel {
    static async addSubject(courseName) {
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            // Insert new subject
            const insertSubjectQuery = 'INSERT INTO subjects (CourseName) VALUES (?)';
            const [insertSubjectRows] = await connection.execute(insertSubjectQuery, [courseName]);

            const newSubjectId = insertSubjectRows.insertId;

            await connection.commit();

            console.debug('Subject added successfully:', newSubjectId);
            return newSubjectId;
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error while adding subject:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async deleteSubject(courseId) {
        let connection;
        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            // Delete the subject
            const deleteSubjectQuery = 'DELETE FROM subjects WHERE CourseID = ?';
            await connection.execute(deleteSubjectQuery, [courseId]);

            await connection.commit();

            console.debug('Subject deleted successfully:', courseId);
            return true;
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error deleting subject:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    static async getSubjects() {
        let connection;
        try {
            connection = await db.getConnection();

            // Retrieve all subjects
            const selectSubjectsQuery = 'SELECT * FROM subjects';
            const [subjects] = await connection.execute(selectSubjectsQuery);

            console.debug('Subjects retrieved successfully');
            return subjects;
        } catch (error) {
            console.error('Error retrieving subjects:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}

module.exports = SubjectModel;
