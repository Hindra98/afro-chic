const dao = require("./dao.factory");

const showDetailCommande = async (id) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      `SELECT 
      c.id AS commande_id, c.utilisateur_id, c.date_com, c.statut, c.total, dc.id AS details_commande_id, dc.produit_id, dc.quantite, dc.prix_unitaire, u.nom AS utilisateur_nom, u.email AS utilisateur_email
      FROM 
        commande c
      JOIN 
          details_commande dc ON c.id = dc.commande_id
      JOIN 
        utilisateur u ON c.utilisateur_id = u.id
      WHERE commande_id=?;
      `,
      [id],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const createDetailCommande = async (commande_item) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "INSERT INTO details_commande (quantite, prix_unitaire, produit_id, commande_id)) VALUES (?, ?, ?, ?)",
      [commande_item.quantite, commande_item.prix_unitaire, commande_item.produit, commande_item.commande],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};


const findCommande = async (id_) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "SELECT * FROM commande WHERE id=?",
      [id_],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const createCommande = async (commande_item) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "INSERT INTO commande (utilisateur_id, date_com, statut, total) VALUES (?, ?, ?, ?)",
      [
        commande_item.utilisateur_id,
        commande_item.date_com,
        commande_item.statut,
        commande_item.total,
      ],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const updateCommande = async (_id, commande_item) => {
  const dbconnexion = dao.dbconnexion;

  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "UPDATE commande SET utilisateur_id = ?, date_com = ?, statut = ?, total = ?, WHERE id = ?",
      [
        commande_item.utilisateur_id,
        commande_item.date_com,
        commande_item.statut,
        commande_item.total,
        _id,
      ],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deleteCommande = async (id_) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      `START TRANSACTION;
      DELETE FROM details_commande WHERE commande_id = ?;
      DELETE FROM commande WHERE id = ?;
      COMMIT;`,
      [id_, id_],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  findCommande,
  updateCommande,
  createCommande,
  deleteCommande,
  showDetailCommande,
  createDetailCommande
};
