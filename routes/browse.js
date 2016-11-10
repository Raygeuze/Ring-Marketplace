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

//get this item
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  getItem(req.params.id, function(item){
      res.render('purchase', {title: req.params.id, item: item});
  });
});

function getItem(id,callback){
  var item;
  console.log(id+"inside get item");
  ref.orderByChild('Rings').once('value')
  .then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      if(childSnapshot.val().name == id ){
        console.log(childSnapshot.val());
        item = childSnapshot.val();
      }
    });
  }).then(function(){
    callback(item);
  });
};

module.exports = router;
