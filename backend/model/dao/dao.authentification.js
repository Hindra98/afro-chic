const dao = require('./dao.factory')


const loginDAO = async (email, password) => {
    const dbconnexion = dao.dbconnexion;
    return new Promise((resolve, reject) => {
        dbconnexion.query("SELECT * FROM client WHERE email = ?, email = ? ", [email, password], function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const pushCredentials = async (email, password, token) => {
    const dbconnexion = dao.dbconnexion;
    return new Promise((resolve, reject) => {
        dbconnexion.query("INSERT INTO credentials (client_id, email, password, token) VALUES (?, ?, ?, ?)", 
            [1,  email, password, token], function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    loginDAO,
    pushCredentials
};
