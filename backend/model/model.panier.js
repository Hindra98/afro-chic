'use strict';

class LignePanier {
    constructor(code, qte, prix) {
        this.codeArticle = code;
        this.qteArticle = qte;
        this.prixArticle = prix;
    }

    ajouterQte(qte) {
        this.qteArticle += qte;
    }

    getPrixLigne() {
        return this.prixArticle * this.qteArticle;
    }

    getCode() {
        return this.codeArticle;
    }

    getQte() {
        return this.qteArticle;
    }

    getPrix() {
        return this.prixArticle;
    }
}


class Panier {
    constructor() {
        this.liste = [];
    }

    ajouterArticle(code, qte, prix) {
        const index = this.getArticle(code);
        if (index === -1) {
            this.liste.push(new LignePanier(code, qte, prix));
        } else {
            this.liste[index].ajouterQte(qte);
        }
    }

    getPrixPanier() {
        let total = 0;
        for (let i = 0; i < this.liste.length; i++) {
            total += this.liste[i].getPrixLigne();
        }
        return total;
    }

    getArticle(code) {
        for (let i = 0; i < this.liste.length; i++) {
            if (code === this.liste[i].getCode()) {
                return i;
            }
        }
        return -1;
    }

    supprimerArticle(code) {
        const index = this.getArticle(code);
        if (index > -1) {
            this.liste.splice(index, 1);
        }
    }
}

module.exports = Panier;
