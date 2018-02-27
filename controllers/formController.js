var bodyParser = require('body-parser');
var Form = require('./formSchema');


var jsonParser = bodyParser.json()


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
