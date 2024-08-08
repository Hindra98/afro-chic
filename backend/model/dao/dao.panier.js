const Panier = require("../model.panier");

let panier = new Panier();

const getPanier = async () => {
  return panier;
};

const ajouterArticle = async (code, qte, prix) => {
  panier.ajouterArticle(code, qte, prix);
  return { success: true, panier };
};

const supprimerArticle = async (code) => {
  panier.supprimerArticle(code);
  return { success: true, panier };
};

const getPrixPanier = async () => {
  return panier.getPrixPanier();
};

module.exports = {
  getPanier,
  ajouterArticle,
  supprimerArticle,
  getPrixPanier,
};
