/**
  * @file     resultat.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Routeur pour les résultats
  *          
  */

var express = require('express');
var router = express.Router();

// LANCER LA PAGE DE RESULTAT A L'APPEL DE LA ROUTE
router.get('/', function (req, res, next) {
  res.render('pages/resultat.ejs', { title: 'Resultat' });
});

module.exports = router;    
