const mongoose = require('mongoose');

const cyberprojectrecordSchema = mongoose.Schema({


  email : {type: String, required: true },
  password : {type: String, required: true },
  datasource : {type: String, required: true },
  name : {type: String, required: true },
  pawprint : {type: String, required: true },
  department : {type: String, required: true },
  role : {type: String, required: true },
  pi : {type: String, required: true },
  protitle : {type: String, required: true },
  prodesc : {type: String, required: true },
  funding : {type: String, required: true },
  datatype : {type: String, required: true },
  irb : {type: String, required: true }
});

module.exports = mongoose.model('cyberprojectrecordSchema', cyberprojectrecordSchema);
