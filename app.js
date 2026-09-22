/**
  * @file     app.js
  * @author   Maxim Jacquet (maxim.jacquet@outlook.com)
  * @version  1
  * @date     22/09/2026
  * @brief    Première ébauche d'une architecture générique "RESTful" avec Express
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
app.use('/contacts', require('./routes/contacts'));
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
