/**
  * @file     commande.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Première ébauche d'une architecture générique "RESTful" avec Express
  *          Routeur pour les commandes
  */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/commande.ejs', { title: 'Commande' });
});

module.exports = router;    
