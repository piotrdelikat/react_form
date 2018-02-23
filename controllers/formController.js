var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var jsonParser = bodyParser.json()

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds243418.mlab.com:43418/react_form');

var formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: String,
});

var Form = mongoose.model('Form', formSchema);

  module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index')
  });

  app.post('/', jsonParser, function(req, res) {
    console.log(req.body);
    var newForm = Form(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
};
