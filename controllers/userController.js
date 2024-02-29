// controllers/userController.js
const pool = require('../db');
const bcrypt = require('bcrypt')

exports.getSchoolMembers = async (req, res) => {
    try {
        const requestingSchoolId = req.user.userId;
        console.log('Requesting School ID:', requestingSchoolId);
        const { filter } = req.query;
        console.log('Filter:', filter);

        let query;
        let queryParams;

        if (filter === 'all') {
            query = 'SELECT * FROM Users WHERE UserType IN (?, ?) AND Username LIKE ?';
            queryParams = ['student', 'teacher', `${requestingSchoolId}.%`];
        } else {
            query = 'SELECT * FROM Users WHERE UserType = ? AND Username LIKE ?';
            queryParams = [filter, `${requestingSchoolId}.%`];
        }

        console.log('Generated SQL query:', query);
        console.log('Query Params:', queryParams);

        const [members] = await pool.query(query, queryParams);

        console.log('Fetched Members:', members);
        res.json({ members });
    } catch (error) {
        console.error('Error fetching school members:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getUserTypes = async (req, res) => {
    try {
        // Fetch distinct user types from the Users table
        const [userTypes] = await pool.query('SELECT DISTINCT UserType FROM Users');

        // Filter the user types to include only 'student' and 'teacher'
        const filteredUserTypes = userTypes.map((row) => row.UserType).filter((type) => ['student', 'teacher'].includes(type));

        res.json({ userTypes: filteredUserTypes });
    } catch (error) {
        console.error('Error fetching user types:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const [result] = await pool.query('DELETE FROM Users WHERE UserID = ?', [userId]);

        if (result.affectedRows > 0) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;

        const { FirstName, LastName, Email, PhoneNumber, BirthDate } = updatedData;

        await pool.query(
            'UPDATE Users SET FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?, BirthDate = ? WHERE UserID = ?',
            [FirstName, LastName, Email, PhoneNumber, BirthDate, userId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


