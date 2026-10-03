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

const PRIX_INGREDIENTS = 1.50; // Prix fixe pour chaque ingrédient supplémentaire
const TAUX_TAXE = 0.15; // Taux de taxe fixe de 15%

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
    //C2: Chiffre magique
    // CALCULER LE PRIX DES EXTRAS
    const prixExtras = nombreIngredients * PRIX_INGREDIENTS;

    // MODULER LE PRIX SELON LA TAILLE
    const multiplicateursTailles = {
        Petite: 0.8,
        Moyenne: 1,
        Grande: 1.2
    };
    //A23 : Tu multiplie le prix des ingrédients selon la taille de la pizza, ce qui n'est pas sensé être le cas.
    // CALCULS FINALS
    const multiplicateurTaille = multiplicateursTailles[req.body.taille] || 1;
    const prixAvecTaille = prixType * multiplicateurTaille;
    const prixUnitaire = prixAvecTaille + prixExtras;
    const sousTotal = prixUnitaire * quantite;

    //C2: Chiffre magique
    // AJOUT DE LA TAXE
    const taxe = sousTotal * TAUX_TAXE;
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
