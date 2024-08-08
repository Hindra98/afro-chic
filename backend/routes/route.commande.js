const express = require("express");
const cmd = require("../model/model.commande");

const controler = require("../controler/controler.commande");

const router = express.Router();

router.get("/commande/detail", async (req, res) => {
  // To show commande detail, we need the id of the commande
  const { id } = req.query;
  console.log(id)
  try {
    const results = await controler.showDetailCommande(parseInt(id));
    if ((results.success = true)) {
      res.status(200).send(results);
    } else {
      res.status(404).send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/commande/detail", async (req, res) => {
  // const { id } = req.query;
  const commande_item = new cmd.DetailCommande({
    quantite: parseInt(req.body.quantite),
    prix_unitaire: req.body.prix_unitaire,
    produit_id: parseInt(req.body.produit),
    commande_id: parseInt(req.body.commande)
  });
  try {
    const results = await controler.CreateDetailCommande(commande_item);
    if ((results.success = true)) {
      res.status(200).send(results);
    } else {
      res.status(404).send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/commande/new/", async (req, res) => {
  const product = new cmd.Commande({
    utilisateur_id: parseInt(req.body.utilisateur),
    total: req.body.total,
    statut: req.body.statut,
    date_com: req.body.date_com
  });

  try {
    const results = await controler.createProduct(product);
    if ((results.success = true)) {
      res.status(200).send(results);
    } else {
      res.status(404).send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/commande/update", async (req, res) => {
  const { id } = req.query;
  const product = new Product({
    nom: req.body.nom,
    url_image: req.body.url_image,
    prix: req.body.prix,
    category: parseInt(req.body.category),
    quantite_stock: req.body.quantite_stock,
    description: req.body.description,
    code: req.body.code,
  });

  const results = await controler.updateProduct(parseInt(id), product);
  if (results) {
    return res
      .status(200)
      .send({ message: "Product Updated", data: JSON.stringify(results) });
  }
  return res.status(404).send({ message: "Error in Updating Product." });
});
router.delete("commande/remove", async (req, res) => {
  const { id } = req.query;
  const deletedProduct = await controler.deleteProduct(id);
  if (deletedProduct) {
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in deleting Product.");
  }
});


router.get("/commande/category", async (req, res) => {
  const categories = await controler.findProductCategory();
  res.send(categories);
});

router.post("/commande/category/new/", async (req, res) => {
  const product_category = new Product({
    nom: req.body.categorie,
    description: req.body.description,
  });

  try {
    const results = await controler.createProductCategory(product_category);
    if ((results.success = true)) {
      res.status(200).send(results);
    } else {
      res.status(404).send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/commande/category/update", async (req, res) => {
  const { id } = req.query;
  const categorie = {
    nom: req.body.nom,
    description: req.body.description,
  };

  const results = await controler.updateProductCategory(parseInt(id), categorie);
  if (results) {
    return res
      .status(200)
      .send({ message: "Category Updated", data: JSON.stringify(results) });
  }
  return res.status(500).send({ message: "Error in Updating Product." });
});
router.delete("commande/category/remove", async (req, res) => {
  const { id } = req.query;
  const deletedCategory = await controler.deleteProductCategory(id);
  if (deletedCategory) {
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in deleting Product.");
  }
});

module.exports = router;
