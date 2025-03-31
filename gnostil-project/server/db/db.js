const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://postgres:DAN0NOAH1@localhost/GnostilDB');

const fetchManeuvers = async()=> {
  const SQL = `
    SELECT * FROM maneuvers
  `;
  const response = await client.query(SQL);
  console.log(response.rows);
  return response.rows;
};

const fetchManeuver = async(id)=> {
  const SQL = `
    SELECT * FROM maneuvers WHERE id = $1
  `;
  const response = await client.query(SQL, [id]);
  console.log(response.rows);
  return response.rows;
};

module.exports = {
  client,
  fetchManeuvers,
};