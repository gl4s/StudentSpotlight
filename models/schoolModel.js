const pool = require('../db');
const bcrypt = require('bcrypt');

exports.beginTransaction = async () => {
  await pool.query('START TRANSACTION');
};

exports.commitTransaction = async () => {
  await pool.query('COMMIT');
};

exports.rollbackTransaction = async () => {
  await pool.query('ROLLBACK');
};

exports.insertSchool = async (schoolName, schoolIdentifier, address) => {
  const [result] = await pool.query(
    'INSERT INTO Schools (SchoolName, SchoolIdentifier, Address) VALUES (?, ?, ?)',
    [schoolName, schoolIdentifier, address]
  );
  return result.insertId;
};

exports.insertSchoolAdmin = async (username, passwordHash) => {
  const [result] = await pool.query(
    'INSERT INTO Users (Username, PasswordHash, UserType) VALUES (?, ?, ?)',
    [username, passwordHash, 'schooladmin']
  );
  return result.insertId;
};

exports.getAllSchools = async () => {
  const [schools] = await pool.query('SELECT * FROM Schools');
  return schools;
};

exports.getSchoolById = async (schoolId) => {
  const [schoolRows] = await pool.query(
    'SELECT * FROM Schools WHERE SchoolID = ?',
    [schoolId]
  );

  if (schoolRows.length === 0) {
    return null;
  }

  const schoolIdentifier = schoolRows[0].SchoolIdentifier;

  const [userRows] = await pool.query(
    'SELECT * FROM Users WHERE Username = ? AND UserType = "schooladmin"',
    [schoolIdentifier]
  );

  if (userRows.length === 0) {
    return null;
  }

  return { ...schoolRows[0], ...userRows[0] };
};

exports.editSchoolAdmin = async (userId, updatedData) => {
  await pool.query('START TRANSACTION');

  try {
    // Retrieve the current username from the Users table
    const [currentUser] = await pool.query('SELECT Username FROM Users WHERE UserID = ?', [userId]);
    const currentUsername = currentUser[0].Username;
    const [OldSchool] = await pool.query('SELECT SchoolIdentifier FROM Schools WHERE SchoolIdentifier = ?', [currentUsername]);
    const OldSchoolIdentifier = OldSchool[0].SchoolIdentifier;
    // Update the Schools table based on SchoolIdentifier
    await pool.query(
      'UPDATE Schools SET SchoolName = ?, SchoolIdentifier = ?, Address = ?, SchoolLevel = ?, EducationLevel = ? WHERE SchoolIdentifier = ?',
      [
        updatedData.SchoolName,
        updatedData.SchoolIdentifier,
        updatedData.Address,
        updatedData.SchoolLevel,
        updatedData.EducationLevel,
        currentUsername
      ]
    );

    // Update the Users table based on Username if SchoolIdentifier has changed
    if (updatedData.SchoolIdentifier !== OldSchoolIdentifier) {
      const [existingUser] = await pool.query('SELECT * FROM Users WHERE Username = ?', [updatedData.SchoolIdentifier]);

      await pool.query('UPDATE Users SET Username = ? WHERE Username = ?', [updatedData.SchoolIdentifier, currentUsername]);
    }

    if (updatedData.Password) {
      // Update the password only if a new password is provided
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updatedData.Password, saltRounds);

      await pool.query(
        'UPDATE Users SET PasswordHash = ?, Email = ?, PhoneNumber = ? WHERE Username = ?',
        [hashedPassword, updatedData.Email, updatedData.PhoneNumber, currentUsername]
      );
    } else {
      // If no new password is provided, update other user details without changing the password
      await pool.query(
        'UPDATE Users SET Email = ?, PhoneNumber = ? WHERE Username = ?',
        [updatedData.Email, updatedData.PhoneNumber, currentUsername]
      );
    }

    await pool.query('COMMIT');

    return { success: true };
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error editing school admin:', error);
    throw error;
  }
};


