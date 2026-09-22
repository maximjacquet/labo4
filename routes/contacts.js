/**
  * @file     contacts.js
  * @author   Nicolas Géraudie (nicolas.geraudie@clg.qc.ca)
  * @version  1
  * @date     18/09/2025
  * @brief    Première ébauche d'une architecture générique "RESTful" avec Express
  *          Routeur pour les contacts
  */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/contacts', { title: 'Contacts' });
});

module.exports = router;    
