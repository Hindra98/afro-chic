const express = require("express");
const Panier = require("../model/model.panier");
const controler = require("../controler/controler.panier");

const router = express.Router();

router.get("/product/panier", async (req, res) => {
  try {
    const panier = await controler.getPanier();
    res.send(panier);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/product/panier/ajouter", async (req, res) => {
  const { code, qte, prix } = req.body;

  try {
    const result = await controler.ajouterArticle(code, qte, prix);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/product/panier/supprimer", async (req, res) => {
  const { code } = req.body;

  try {
    const result = await controler.supprimerArticle(code);
    if (result.success) {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/product/panier/prix", async (req, res) => {
  try {
    const total = await controler.getPrixPanier();
    res.send({ total });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
