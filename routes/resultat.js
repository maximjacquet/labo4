/**
  * @file     resultat.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Première ébauche d'une architecture générique "RESTful" avec Express
  *          Routeur pour les résultats
  */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/resultat.ejs', { title: 'Resultat' });
});

module.exports = router;    
