const mysql = require('mysql');

require('dotenv').config()

const { url, usern, passw, database } = process.env

const DB_NAME = 'afroshop'

const dbconnexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
});

dbconnexion.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); });

const getDBName = () => {
    return DB_NAME
}

module.exports = { dbconnexion, getDBName }