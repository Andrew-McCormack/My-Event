var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET About page. */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Express' });
});

/* GET Checkout Cart page. */
router.get('/checkoutCart', function(req, res, next) {
    res.render('checkoutCart', { title: 'Express' });
});

/* GET About page. */
router.get('/profile', function(req, res, next) {
    res.render('profile', { title: 'Express' });
});

/* GET BirthdayBand page. */
router.get('/BirthdayBand', function(req, res, next) {
    res.render('BirthdayBand', { title: 'Express' });
});

/* GET BirthdayVenue page. */
router.get('/BirthdayVenue', function(req, res, next) {
    res.render('BirthdayVenue', { title: 'Express' });
});

/* GET Checkout page. */
router.get('/checkout', function(req, res, next) {
    res.render('checkout', { title: 'Express' });
});

/* GET Checkout page. */
router.get('/Profile', function(req, res, next) {
    res.render('profile', { title: 'Express' });
});

/* GET CheckoutBirthday page. */
router.get('/checkoutBirthday', function(req, res, next) {
    res.render('checkoutBirthday', { title: 'Express' });
});

/* GET Index page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Express' });
});

/* GET Home page. */
router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Express' });
});

/* GET PaymentPage page. */
router.get('/paymentpage', function(req, res, next) {
    res.render('paymentpage', { title: 'Express' });
});

/* GET PaymentPage page. */
router.get('/checkoutBirthday/paymentpage', function(req, res, next) {
    res.render('paymentpage', { title: 'Express' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Express' });
});

/* GET SignUp page. */
router.get('/SignUp', function(req, res, next) {
    res.render('SignUp', { title: 'Express' });
});

/* GET Venue page. */
router.get('/venue', function(req, res, next) {
    res.render('venue', { title: 'Express' });
});

/* GET WeddingBands page. */
router.get('/WeddingBands', function(req, res, next) {
    res.render('WeddingBands', { title: 'Express' });
});

/* GET WeddingVenue page. */
router.get('/WeddingVenue', function(req, res, next) {
    res.render('WeddingVenue', { title: 'Express' });
});


/* GET Index page. */
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* GET Payment page. */
router.get('/paymentpage', function(req, res) {
    res.render('paymentpage', { title: 'Charge $10 with Simplify Commerce' });
});

/* GET PaymentSuccessPage page. */
router.get('/paymentsuccess', function(req, res, next) {
    res.render('paymentsuccess', { title: 'Payment successfully authorized' });
});

/* POST to Payment Page */
router.post('/payment', function(req, res) {
  console.log('Returned from payment page');
    console.log(req.body.simplifyToken)
  
    var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_YWI3NWQ4MzgtODhmMC00NzgyLTgzNzItYzY0NzZmNjVjYTNl',
        privateKey: 'PFao6g1E3h+OyReXU9bY0oJXss8oPvHLWWUCW/aNCSB5YFFQL0ODSXAOkNtXTToq'
    });
 
    client.payment.create({
      amount : "23500",
      token : req.body.simplifyToken,
      description : "payment description",
      reference : "7a6ef6be31",
      currency : "EUR"
    },
    
    function(errData, data){
    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        return;
    }
 
    console.log("Payment Status: " + data.paymentStatus);
    res.render('paymentsuccess', { title: 'Payment successfully authorized' });
  });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});


module.exports = router;
