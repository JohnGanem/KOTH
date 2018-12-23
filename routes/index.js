var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Accueil', menuId:'accueil'});
});

router.get('/combat', function(req, res, next) {
  res.render('combat', {page:'Combat Live', menuId:'combat'});
});

module.exports = router;
