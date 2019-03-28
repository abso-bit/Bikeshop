var express = require('express');
var router = express.Router();
var stripe = require("stripe")("sk_test_1sIUTf3y7DJCrXalj6yo4rSM");
var dataCardBike = [];

var validEmail = 'test@test.com';
var validPassword = 'test'


var dataBike = [
  {name: "Model BIKO45", url:"/images/bike-1.jpg", price: 679},
  {name: "Model ZOOK7", url:"/images/bike-2.jpg", price: 799},
  {name: "Model LIKO89", url:"/images/bike-3.jpg", price: 839},
  {name: "Model GEWO", url:"/images/bike-4.jpg", price: 1206},
  {name: "Model TITAN5", url:"/images/bike-5.jpg", price: 989},
  {name: "Model AMIG39", url:"/images/bike-6.jpg", price: 599}
]

router.get('/', function(req, res, next) {
  res.render('index', { dataBike:dataBike, isLoggedIn: req.session.isLoggedIn });
});

router.post('/add-card', function(req, res, next) {
  console.log(req.body);
  dataCardBike.push(req.body);
  res.render('shop', {dataCardBike});
});

router.get('/delete-card', function(req, res, next) {
  console.log(req.query);
  dataCardBike.splice(req.query.position, 1)
  res.render('shop', {dataCardBike});
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  console.log('req.body ===>', req.body);

  if (req.body.email == validEmail && req.body.password == validPassword) {
    req.session.isLoggedIn = true;
    res.render('index', {
      dataBike: dataBike,
      isLoggedIn: req.session.isLoggedIn
    });
  } else {
    req.session.isLoggedIn = false;
    res.render('login');
  }
});

router.get('/logout', function(req, res, next) {
  req.session.isLoggedIn = false;
  res.render('index', { isLoggedIn: req.session.isLoggedIn, dataBike: dataBike });
});

router.post('/update-card', function(req, res, next) {
  console.log(req.body);
  dataCardBike[req.body.position].quantity = req.body.quantity;
  res.render('shop', {dataCardBike});
});

router.post('/check', function(req, res, next) {
  const token = req.body.stripeToken;
      var paiement = req.body.pay
  const charge = stripe.charges.create({
    amount: paiement,
    currency: 'eur',
    description: 'Example charge',
    source: token,
    receipt_email: 'abso.bit@gmail.com',
  });
res.render('shop', {dataCardBike});
});

module.exports = router;
