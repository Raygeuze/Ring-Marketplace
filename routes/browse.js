var express = require('express');
var router = express.Router();
var firebase = require('firebase');

var ref = firebase.database().ref('Rings');

/* GET browsing page. */
router.get('/', function(req, res, next) {
  getAllRings(function(rings){
    console.log(rings);
    res.render('browse', { title: 'Browse Ring Market' , rings: rings});
  });
});

function getAllRings(callback){
  rings = [];
  ref.orderByChild('Rings').once('value')
  .then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      rings.push(childSnapshot.val());
    });
  }).then(function(){
    callback(rings);
  });
}

module.exports = router;
