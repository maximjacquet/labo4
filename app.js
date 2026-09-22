/**
  * @file     app.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    "main" du serveur de pizzeria
  */
const PORT = 3000;
var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/index'));


// ROUTES //---------------------------------------------------------

// Contacts
app.use('/contacts', require('./routes/contacts'));

// Commande
app.use('/commande', require('./routes/commande'));

// Résultat
app.use('/resultat', require('./routes/resultat'));

// Recherche
app.use('/recherche', require('./routes/recherche'));


// Gestion des erreurs 404
app.use(function (req, res, next) {
    res.status(404)
    res.render("pages/404.ejs");
});




let server = app.listen(PORT, function(){
    console.log('Server is running on port ' + PORT);
});

// gestion des erreurs
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // afficher la page d’erreurs
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app};
