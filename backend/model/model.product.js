class Product {
    constructor({ nom, prix, url_image, category, quantite_stock, description, code }) {
        this.nom = nom;
        this.prix = prix;
        this.url_image = url_image;
        this.category = category;
        this.quantite_stock = quantite_stock;
        this.description = description;
        this.code = code;
    }
 
    getProduct() {
        return this.product
    }

    // Getters
    getNom() {
        return this.product.nom;
    }

    geturl_image() {
        return this.product.url_image;
    }


    getprix() {
        return this.product.prix;
    }

    getCategory() {
        return this.product.category;
    }

    getquantite_stock() {
        return this.product.quantite_stock;
    }

    getDescription() {
        return this.product.description;
    }

    getCode() {
        return this.product.code;
    }

    // Setters
    setNom(nom) {
        this.product.nom = nom;
    }

    seturl_image(url_image) {
        this.product.url_image = url_image;
    }

    setprix(prix) {
        this.product.prix = prix;
    }

    setCategory(category) {
        this.product.category = category;
    }

    setquantite_stock(quantite_stock) {
        this.product.quantite_stock = quantite_stock;
    }

    setDescription(description) {
        this.product.description = description;
    }

    setCode(code) {
        this.product.code = code;
    }

    setProduct(product) {
        this.product = product
    }
}

module.exports = Product;
