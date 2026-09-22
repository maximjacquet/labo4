/**
  * @file     commande.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Routeur pour les commandes
  *          
  */

var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var databasePath = path.join(__dirname, '..', 'database.txt');


// AFFICHER LA PAGE DE COMMANDE QUAND ON LANCE LA ROUTE 
router.get('/', function (req, res, next) {
    res.render('pages/commande.ejs', { title: 'Commande' });
});



// LIRE LA RÉPONSE AU FORMULAIRE 
router.post('/', function (req, res, next) {

    // LE CALCUL DU PRIX TOTAL DE LA COMMANDE ET DE L'AJOUT A LA DATABASE EST GÉNÉRÉ PAR L'IA.
    const quantite = Number(req.body.quantite);


    // PRIX DE CHAQUE SORTE
    const prixTypes = {
        Margarita: 10.00,
        Pepperoni: 12.50,
        Vegetarian: 11.50
    };

    // ALLER CHERCHER LE TYPE DE PIZZA
    const prixType = prixTypes[req.body.type] || 0;

    // ALLER CHERCHER LES INGRÉDIENTS EXTRA
    const ingredientsEnvoyes = req.body['extra[]'] || [];
    const ingredients = Array.isArray(ingredientsEnvoyes)
        ? ingredientsEnvoyes
        : [ingredientsEnvoyes];
    const nombreIngredients = ingredients.length;

    // CALCULER LE PRIX DES EXTRAS
    const prixExtras = nombreIngredients * 1.50;

    // MODULER LE PRIX SELON LA TAILLE
    const multiplicateursTailles = {
        Petite: 0.8,
        Moyenne: 1,
        Grande: 1.2
    };

    // CALCULS FINALS
    const multiplicateurTaille = multiplicateursTailles[req.body.taille] || 1;
    const prixAvecTaille = (prixType + prixExtras) * multiplicateurTaille;
    const sousTotal = prixAvecTaille * quantite;

    // AJOUT DE LA TAXE
    const taxe = sousTotal * 0.15;
    const prixTotal = sousTotal + taxe;


    // CRÉÉER UN TOUT AVEC LES INFO DE LA COMMANDE ET LE PRIX
    const commande = {
        ...req.body,
        extra: ingredients,
        sousTotal: sousTotal.toFixed(2),
        taxe: taxe.toFixed(2),
        prixTotal: prixTotal.toFixed(2),
        date: new Date().toISOString()
    };
    // AJOUTER LES INFOS DE LA COMMANDE DANS LA DATABASE
    fs.appendFile(databasePath, JSON.stringify(commande) + '\n', function (error) {
        if (error) {
            return next(error);
        }

        // FIN DE LA SECTION GÉNÉRÉE PAR L'IA POUR LA GESTION DES COMMANDES

        // AFFICHER LA PAGE EN PASSANT LES INFOS DE LA COMMANDE ET LE PRIX TOTAL
        res.render('pages/resultat.ejs', {
            commande: commande,
            sousTotal: commande.sousTotal,
            taxe: commande.taxe,
            prixTotal: commande.prixTotal
        });
    });
});

module.exports = router;    
