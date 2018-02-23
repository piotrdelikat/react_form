var express = require('express');
var formController = require('./controllers/formController');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './public')

app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/assets/js',express.static(__dirname + '/public/assets/js'));

//fire controller
formController(app);

app.listen(3000);
