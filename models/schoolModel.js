const pool = require('../db');

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

  const [userRows] = await pool.query(
    'SELECT * FROM Users WHERE UserID = ?',
    [schoolId]
  );

  return { ...schoolRows[0], ...userRows[0] };
};

exports.updateSchool = async (schoolId, schoolData) => {
  await pool.query(
    'UPDATE Schools SET SchoolName = ?, SchoolIdentifier = ?, Address = ?, SchoolLevel = ?, EducationLevel = ? WHERE SchoolID = ?',
    [schoolData.SchoolName, schoolData.SchoolIdentifier, schoolData.Address, schoolData.SchoolLevel, schoolData.EducationLevel, schoolId]
  );
};

exports.updateUser = async (userId, userData) => {
  await pool.query(
    'UPDATE Users SET Username = ?, PasswordHash = ?, FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ? WHERE UserID = ?',
    [userData.Username, userData.PasswordHash, userData.FirstName, userData.LastName, userData.Email, userData.PhoneNumber, userId]
  );
};
