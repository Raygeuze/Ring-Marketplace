var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var app = firebase.initializeApp({
   apiKey: "AIzaSyAjVH-dw3DMQXQQAlRkAWI-wvuH8Vsmpdw",
   authDomain: "ringmarket-b6126.firebaseapp.com",
   databaseURL: "https://ringmarket-b6126.firebaseio.com",
   storageBucket: "ringmarket-b6126.appspot.com",
   messagingSenderId: "167276629276"
 });

 // var ref = firebase.database().ref('Rings');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Ring Market', entered: '' + req.body.firstname});
});

module.exports = router;
