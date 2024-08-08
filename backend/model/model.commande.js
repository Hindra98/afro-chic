class Commande {
    constructor(id, utilisateur_id, date_com, statut, total) {
      this.id = id;
      this.utilisateur_id = utilisateur_id;
      this.date_com = date_com || new Date();  // par défaut, la date actuelle
      this.statut = statut;
      this.total = total;
    }
  }

  class DetailCommande {
    constructor(quantite, prix_unitaire, produit_id, commande_id) {
      this.quantite = quantite;
      this.prix_unitaire = prix_unitaire;
      this.produit_id = produit_id;
      this.commande_id = commande_id;
    }
  }

module.exports = {
    Commande,
    DetailCommande
}