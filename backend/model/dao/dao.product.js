const dao = require("./dao.factory");

const findOneProduct = async (id) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      `SELECT produit.*, nom_categorie, categorie.description AS categorie_description 
      FROM produit INNER JOIN categorie ON produit.categorie_id = categorie.id WHERE produit.id = ?`,
      [id],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const findProduct = async () => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      `SELECT produit.*, nom_categorie, categorie.description AS categorie_description 
      FROM produit INNER JOIN categorie ON produit.categorie_id = categorie.id 
      GROUP BY nom_categorie 
      ORDER BY nom_categorie ASC;`,
      [],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const createProduct = async (product) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "INSERT INTO produit (nom, description, prix, quantite_stock, categorie_id, url_image, code) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        product.nom,
        product.description,
        product.prix,
        product.quantite_stock,
        product.category,
        product.url_image,
        product.code,
      ],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const updateProduct = async (_id, product) => {
  const dbconnexion = dao.dbconnexion;

  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "UPDATE produit SET nom = ?, description = ?, prix = ?, quantite_stock = ?, categorie_id = ?, url_image = ?, code = ? WHERE id = ?",
      [
        product.nom,
        product.description,
        product.prix,
        product.quantite_stock,
        product.category,
        product.url_image,
        product.code,
        _id,
      ],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deleteProduct = async (id) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "DELETE FROM produit WHERE id = ?",
      [id],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};


const findProductCategory = async () => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      `SELECT * FROM categorie`,
      [],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};
const createProductCategory = async (categorie) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "INSERT INTO categorie (nom_categorie, description) VALUES (?, ?)",
      [
        product.nom,
        product.description
      ],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const updateProductCategory = async (_id, categorie) => {
  const dbconnexion = dao.dbconnexion;

  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "UPDATE produit SET nom_categorie = ?, description = ? WHERE id = ?",
      [
        product.nom,
        product.description,
        _id,
      ],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deleteProductCategory = async (id) => {
  const dbconnexion = dao.dbconnexion;
  return new Promise((resolve, reject) => {
    dbconnexion.query(
      "DELETE FROM categorie WHERE id = ?",
      [id],
      function (err, result) {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};


module.exports = {
  findOneProduct,
  findProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  findProductCategory,
  updateProductCategory,
  createProductCategory,
  deleteProductCategory,
};
