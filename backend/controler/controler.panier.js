const panier_dao = require('../model/dao/dao.panier');

const getPanier = async () => {
  try {
    const panier = await panier_dao.getPanier();
    return { data: panier, success: true };
  } catch (error) {
    throw { data: null, success: false, detail: error };
  }
};

const ajouterArticle = async (code, qte, prix) => {
  try {
    const result = await panier_dao.ajouterArticle(code, qte, prix);
    return result;
  } catch (error) {
    throw { data: null, success: false, detail: error };
  }
};

const supprimerArticle = async (code) => {
  try {
    const result = await panier_dao.supprimerArticle(code);
    return result;
  } catch (error) {
    throw { data: null, success: false, detail: error };
  }
};

const getPrixPanier = async () => {
  try {
    const total = await panier_dao.getPrixPanier();
    return { total };
  } catch (error) {
    throw { data: null, success: false, detail: error };
  }
};

module.exports = {
  getPanier,
  ajouterArticle,
  supprimerArticle,
  getPrixPanier,
};
