const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
var request = require("request");
var cors = require('cors');
var multer  = require('multer');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webuDB', {useNewUrlParser: true, useUnifiedTopology: true});

/////////////////////////////REVIEW///////////
const reviewSchema = {
  picture: {
      type: String
  },
    username: {
        type: String,
        required: true
    },
    trekname: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
};

const Review = mongoose.model('Review', reviewSchema);


app.use(cors());
app.get("/review", function(req, res) {
  Review.find({}, function(err, foundReview){
    //console.log(foundReview);
    res.send(foundReview);
});
});

app.post("/addReview", function(req, res) {
  var review = req.body;
  console.log(review);
  Review.insertMany(review, function(err){
    if(err){
      console.log(err);

    }else{
      console.log("successfuly add items+");
    }
  });
  Review.find({}, function(err, foundReview){
  //  console.log(foundReview);
    res.send(foundReview);
  });
});
/////////////////////////////TREKENTRY///////////
const trekSchema = {
  username: {
      type: String,
      required: true
  },
  trekname: {
      type: String,
      required: true
  },
  selectedDay: {
      type: String,
      required: true
  },
  selectedNight: {
      type: String,
      required: true
  },
  selectedDate: {
      type: String,
      required: true
  },
  height_FT: {
      type: String,
      required: true
  },
  height_MT: {
      type: String,
      required: true
  },
  selectedDifficulty: {
      type: String,
      required: true
  },

};

const Trek = mongoose.model('Trek', trekSchema);
app.get("/trek/trekdetails/:trekId", function(req, res) {
  console.log(req.params.trekId);
  Trek.findById(req.params.trekId)
  .then((trek) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      console.log(trek);
      res.json(trek);
  })

});
app.post("/addTrekEntry", function(req, res) {
  var TrekDetails = req.body;
  Trek.insertMany(TrekDetails, function(err){
    if(err){
      console.log(err);

    }else{
      console.log("successfuly add items+");
    }
  });
  Trek.find({}, function(err, foundTrekDetails){
    console.log(foundTrekDetails);
    res.send(foundTrekDetails);
  });

});

//app.use(express.static(path.join(__dirname, './build')))
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, './build'))
//})
app.listen(port,console.log("hosted on port:"+port));
