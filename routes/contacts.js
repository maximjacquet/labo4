/**
  * @file     contacts.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Routeur pour les contacts
  *          
  */

var express = require('express');
var router = express.Router();


// LANCER LA PAGE DE CONTACT A L'APPEL DE LA ROUTE
router.get('/', function (req, res, next) {
  res.render('pages/contacts.ejs', { title: 'Contacts' });
});

module.exports = router;    
