const { db } = require('../config/db');

const getDescriptionById = async (id) => {
    try {
        const query = 'SELECT U.name, d.description FROM users U JOIN description d ON U.id = d.userd_id WHERE U.id = $1;'
        const { rows } = await db.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = { getDescriptionById };

