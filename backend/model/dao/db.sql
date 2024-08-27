--https://app.getpostman.com/join-team?invite_code=e8e6e244e3f40901f088f13057b45aae

CREATE DATABASE ecommerce;
USE ecommerce;

-- Table utilisateur
CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passw VARCHAR(255) NOT NULL,
    adresse TEXT,
    telephone VARCHAR(20),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table catégorie
CREATE TABLE categorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table produit
CREATE TABLE produit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    quantite_stock INT NOT NULL,
    categorie_id INT,
    url_image VARCHAR(255),
    code VARCHAR (255),
    FOREIGN KEY (categorie_id) REFERENCES categorie(id)
);

-- Table commandes
CREATE TABLE commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT,
    date_com TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50),
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

-- Table détails des commande
CREATE TABLE details_commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT,
    produit_id INT,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commande(id),
    FOREIGN KEY (produit_id) REFERENCES produit(id)
);

-- Table avis des utilisateur
CREATE TABLE avis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produit_id INT,
    utilisateur_id INT,
    note INT CHECK (note BETWEEN 1 AND 5),
    commentaire TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produit_id) REFERENCES produit(id),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

-- Table panier
CREATE TABLE panier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

-- Table détails du panier
CREATE TABLE details_panier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    panier_id INT,
    produit_id INT,
    quantite INT NOT NULL,
    FOREIGN KEY (panier_id) REFERENCES panier(id),
    FOREIGN KEY (produit_id) REFERENCES produit(id)
);

-- Table paiement
CREATE TABLE paiement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    montant DECIMAL(10, 2) NOT NULL,
    methode VARCHAR(50),
    FOREIGN KEY (commande_id) REFERENCES commande(id)
);



-- -- Remplissage de la table utilisateur
INSERT INTO utilisateur (nom, email, passw, adresse, telephone) VALUES
('John Doe', 'john.doe@example.com', 'password123', '123 Main St', '1234567890'),
('Jane Smith', 'jane.smith@example.com', 'password123', '456 Elm St', '0987654321'),
('Alice Johnson', 'alice.johnson@example.com', 'password123', '789 Maple St', '2345678901'),
('Bob Brown', 'bob.brown@example.com', 'password123', '101 Pine St', '3456789012'),
('Carol White', 'carol.white@example.com', 'password123', '202 Oak St', '4567890123');


-- Remplissage de la table catégorie
INSERT INTO categorie (titre, description) VALUES
('Électronique', 'Appareils électroniques et gadgets'),
('Vêtements', 'Habits et accessoires de mode'),
('Livres', 'Livres de toutes sortes'),
('Meubles', 'Mobilier pour la maison'),
('Jouets', 'Jouets pour enfants de tous âges');

-- Remplissage de la table produit
INSERT INTO produit (nom, description, prix, quantite_stock, categorie_id, url_image, code) VALUES
('Smartphone', 'Un smartphone dernier cri', 699.99, 50, 1, 'url_image_smartphone', 'code_smartphone'),
('Jeans', 'Jeans bleu classique', 49.99, 200, 2, 'url_image_jeans', 'AA01'),
('Roman', 'Un roman captivant', 14.99, 100, 3, 'url_image_roman', 'AA02'),
('Canapé', 'Un canapé confortable', 499.99, 20, 4, 'url_image_canape', 'AA03'),
('Puzzle', 'Puzzle de 1000 pièces', 19.99, 150, 5, 'url_image_puzzle', 'AA04');

-- Remplissage de la table commande
INSERT INTO commande (utilisateur_id, statut, total) VALUES
(1, 'En attente', 749.98),
(2, 'En cours', 99.98),
(3, 'Livrée', 14.99),
(4, 'Annulée', 0.00),
(5, 'En attente', 519.98);

-- Remplissage de la table détails_commande
INSERT INTO details_commande (commande_id, produit_id, quantite, prix_unitaire) VALUES
(1, 1, 1, 699.99),
(1, 2, 1, 49.99),
(2, 2, 2, 49.99),
(3, 3, 1, 14.99),
(5, 4, 1, 499.99);


-- Remplissage de la table avis
INSERT INTO avis (produit_id, utilisateur_id, note, commentaire) VALUES
(1, 1, 5, 'Excellent produit!'),
(2, 2, 4, 'Très confortable.'),
(3, 3, 3, 'Bon livre, mais pas exceptionnel.'),
(4, 4, 5, 'Canapé très confortable.'),
(5, 5, 4, 'Mes enfants adorent.');

-- Remplissage de la table panier
INSERT INTO panier (utilisateur_id) VALUES
(1),
(2),
(3),
(4),
(5);

-- Remplissage de la table détails_panier
INSERT INTO details_panier (panier_id, produit_id, quantite) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1);

-- Remplissage de la table paiement
INSERT INTO paiement (commande_id, montant, methode) VALUES
(1, 749.98, 'Carte de crédit'),
(2, 99.98, 'PayPal'),
(3, 14.99, 'Carte de crédit'),
(4, 0.00, 'N/A'),
(5, 519.98, 'Carte de crédit');