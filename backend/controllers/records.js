const cyberprojectrecordSchema = require("../models/record");
let resdshift = require("./query");
const Redshift = resdshift.RedshiftClass

exports.createRecord = (req, res, next) => {
  console.log('I am going to post')
  console.log(req.body)
  const url = req.protocol + "://" + req.get("host");
  console.log(url)
  const record = new cyberprojectrecordSchema({
    email : req.body.email,
    password : req.body.password,
    datasource : req.body.datasource,
    name : req.body.name,
    pawprint : req.body.pawprint,
    department : req.body.department,
    role : req.body.role,
    pi : req.body.pi,
    protitle : req.body.protitle,
    prodesc : req.body.prodesc,
    funding : req.body.funding,
    datatype : req.body.datatype,
    irb : req.body.irb
  });
  record.save(function (err, post) {
    console.log(post)
    if (err) { return next(err) }
    res.status(201).json({
      message: "Post added successfully, i ahave posted",
      recordId: post._id
    });
  })
};


exports.createUser = (req, res, next) => {
  console.log('User creation')
  console.log(req.body)
  const url = req.protocol + "://" + req.get("host");
  console.log(url)
  Redshift.executeQuery("select * from pg_user")
  .then((answer)=>{
    res.status(201).json({
      message: "User created succefully",
      redshiftRes: answer
    });
  })
};
