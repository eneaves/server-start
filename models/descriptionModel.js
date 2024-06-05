const { db } = require('../config/db');

const getDescriptionById = async (id) => {
  try {
    const query =
    'SELECT d.id, U.name, d.description, d.prescription FROM users U JOIN description d ON U.id = d.userd_id WHERE U.id = $1;';
    const { rows } = await db.query(query, [id]);
    const uniqueRows = rows.filter((value, index, self) => 
      index === self.findIndex((t) => (
        t.id === value.id
      ))
    );
    return uniqueRows;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


const createDescription = async (description, prescription, userId) => {
  try {
    const query =
    'INSERT INTO description (description, prescription, userd_id, createat) VALUES ($1, $2, $3, NOW()) RETURNING *;';
    const { rows } = await db.query(query, [description, prescription, userId]);
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { getDescriptionById, createDescription};
