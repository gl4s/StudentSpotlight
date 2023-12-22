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
