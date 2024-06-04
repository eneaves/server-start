const { db } = require('../config/db');

const getFeedbackByUserId = async (userId) => {
  try {
    const query =
      'SELECT U.name, f.feedback, f.createdAt FROM users U JOIN feedback f ON u.id = f.user_id WHERE u.id = $1';
    const { rows } = await db.query(query, [userId]);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createFeedback = async(feedback, userId) => {
    try {
      const query = "INSERT INTO feedback (feedback, user_id) VALUES ($1, $2) RETURNING *;";
      const { rows } = await db.query(query, [feedback, userId]);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
}

module.exports = { getFeedbackByUserId, createFeedback };