/**
  * @file     index.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Routeur principal
  *          
  */

var express = require('express');
var router = express.Router();


// LANCER LA PAGE D'ACCUEIL A L'APPEL DE LA ROUTE
router.get('/', function (req, res, next) {
  res.render('pages/acceuil.ejs', { title: 'Accueil' });
});

module.exports = router;    
