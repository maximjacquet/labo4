/**
  * @file     recherche.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Routeur pour les recherches
  *          
  */

var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var databasePath = path.join(__dirname, '..', 'database.txt');


// LANCER LA PAGE DE RECHERCHE A L'APPEL DE LA ROUTE
router.get('/', function (req, res, next) {
    res.render('pages/recherche.ejs', { title: 'Recherche' });
});



// FAIRE LA LECTURE DU NUMERO DE TELEPHONE POUR RECHERCHER DANS LA DATABASE
router.post('/', function (req, res, next) {

    // RÉCUPERER LE NUMERO LUI MEME
    const telephoneRecherche = String(req.body.telephone || '')
        // ENLEVER LES CARACTERES NON NUMÉRIQUES POUR LA COMPARAISON
        .replace(/\D/g, '');

    // LIRE LA BASE DE DONNÉE
    fs.readFile(databasePath, 'utf8', function (error, contenu) {
        if (error) {
            return next(error);
        }
        // ON A MAINTANANT LE CONTENU DE LA DATABASE DANS LA VARIABLE "contenu"
        const commandes = contenu
            // La section ci-dessous est générée par l'IA
            .split('\n')

            // RECHERCHE DU NUMERO PAR LA FONCTION .filter
            .filter(function (ligne) {
                return ligne.trim() !== '';
            })
            .map(function (ligne) {
                try {
                    return JSON.parse(ligne);
                } catch (error) {
                    return null;
                }
            })

            // ON RECHERCHE NOTRE NUMERO DE TELEPHONE DANS LA DATABASE
            .filter(function (commande) {
                return commande && String(commande.telephone || '')
                    .replace(/\D/g, '') === telephoneRecherche;
            });
        // Fin de la section générée par l'IA


        // AFFICHER LES COMMANDES TROUVÉES SI ON EN A TROUVÉ
        res.render('pages/recherche.ejs', {
            title: 'Recherche',
            telephone: req.body.telephone,
            commandes: commandes
        });
    });
});
module.exports = router;    