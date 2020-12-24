const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


const recordsRoutes = require("./routes/records");

 mongoose
   .connect(
     "PUT YOUR URL TO CONNECT TO SPECIFIC DATABASE(MONGODB) HERE"
   ,{ useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
     console.log("Connected to database!");
   })
   .catch(() => {
     console.log("Connection failed!");
   });

const recordSchema = require("./models/record.js");

app.use((req, res, next) => {
  console.log('cors manipulation was called')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

  app.get("/user/records", (req, res, next) => {

    recordSchema.find({ }, function(err, result) {
      console.log('print document started');
      console.log(result);
      console.log('print document ended');
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({
          message: "Posts fetched successfully!",
          records: result
      });
    }
  });
  });

  app.get("/user/records/:id", (req, res, next) => {
    recordSchema.find({ name: req.params.id }).then(result => {
      console.log(result);
      res.status(200).send({
        message: "Posts fetched successfully!",
        records: result
    });
  });
})

app.delete("/user/record/:id", (req, res, next) => {
  recordSchema.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});



app.use("/user/record", recordsRoutes);

module.exports = app
