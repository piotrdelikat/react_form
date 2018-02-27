var mongoose = require('mongoose');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds243418.mlab.com:43418/react_form');

var formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: String,
});

var Form = mongoose.model('Form', formSchema);


module.exports = Form;
