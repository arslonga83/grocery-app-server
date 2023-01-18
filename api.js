const { response } = require('express');

require('dotenv').config()
// console.log(process.env)
// console.log(process.env.dbPassword)
// console.log(process.env.dbHost)
// console.log(process.env.PORT)

const Pool = require('pg').Pool;

const pool = new Pool({
  user: "scrcwcmr",
  host: process.env.dbHost,
  // host: "heffalump.db.elephantsql.com",
  database: "scrcwcmr",
  password: process.env.dbPassword,
  // password: "GwKX7zCBh09Fd4KaghPT0vb8o6JZR9XU",
  port: process.env.PORT
});

const getList = async (req, res) => {
  pool.query('SELECT * from list ORDER BY category ASC', 
  (error, results) => {
    res.status(200).json(results.rows);
  });
};

const addItem = async (req, res) => {
  const { item, category } = req.body;
      pool.query('INSERT INTO list (item, category) VALUES ($1, $2)', [item, category], (error, results) => {
          res.status(201).send(`Item added successfully.`);
  })
};

const editItem = (req, res) => {
  const id = parseInt(req.params.id);
  const { item, category } = req.body;
      pool.query('UPDATE list SET item = $1, category = $2 WHERE id = $3', [item, category, id], (error, results) => {
          res.status(200).send(`item updated.`);
      });
};

const deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
      pool.query('DELETE FROM list WHERE id = $1', [id], (error, results) => {
          res.status(200).send(`Item deleted.`);
      });
};

module.exports = {
  getList,
  addItem,
  editItem,
  deleteItem
};