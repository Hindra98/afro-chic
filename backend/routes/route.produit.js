const express = require("express");
const Product = require("../model/model.product");

const controler = require("../controler/controler.product");

const router = express.Router();

router.get("/product/", async (req, res) => {
  const products = await controler.findProduct();
  res.send(products);
});

router.get("/product/detail", async (req, res) => {
  const { id } = req.query;

  try {
    const results = await controler.findOneProduct(parseInt(id));
    if ((results.success = true)) {
      res.status(200).send(results);
    } else {
      res.status(404).send(results);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/product/new/", async (req, res) => {
  const product = new Product({
    nom: req.body.nom,
    url_image: req.body.url_image,
    prix: req.body.prix,
    category: parseInt(req.body.category),
    quantite_stock: req.body.quantite_stock,
    description: req.body.description,
    code: req.body.code,
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

router.put("/product/update", async (req, res) => {
  const { id } = req.query;
  
  const results = await controler.updateProduct(parseInt(id), product);
  if (results) {
    return res
      .status(200)
      .send(results);
  }
  return res.status(404).send({ message: "Error in Updating Product." });
});
router.delete("product/remove", async (req, res) => {
  const { id } = req.query;
  const deletedProduct = await controler.deleteProduct(id);
  if (deletedProduct) {
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in deleting Product.");
  }
});


router.get("/product/category", async (req, res) => {
  const categories = await controler.findProductCategory();
  res.send(categories);
});

router.post("/product/category/new/", async (req, res) => {
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

router.put("/product/category/update", async (req, res) => {
  const { id } = req.query;
  const categorie = {
    nom: req.body.nom,
    description: req.body.description,
  };

  const results = await controler.updateProductCategory(parseInt(id), categorie);
  if (results) {
    return res
      .status(200)
      .send(results);
  }
  return res.status(500).send({ message: "Error in Updating Product." });
});
router.delete("product/category/remove", async (req, res) => {
  const { id } = req.query;
  const deletedCategory = await controler.deleteProductCategory(id);
  if (deletedCategory) {
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in deleting Product.");
  }
});

module.exports = router;
