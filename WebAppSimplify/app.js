var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_Nzc0MGUyYjMtOWQ4Ni00MThkLTgxZWItNDdjOWFmZmZjN2E3',
        privateKey: 'KoNnNKCY7uejreCZ9ca6uvyZrC37UMlZFwmwTKkgEO15YFFQL0ODSXAOkNtXTToq'
    });

// app.js
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
//app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, function(){
  console.log('Im starting')
});

app.use('/', routes);
app.use('/users', users);

app.post("/payment", function (req, res) 
{
    console.log('Returned from payment page');
    console.log(req.body.simplifyToken);
 
    client.payment.create({
      amount : "1000",
      token : req.body.simplifyToken,
      description : "payment description",
      reference : "7a6ef6be31",
      currency : "USD"
    },
    
    function(errData, data){
    if(errData){
        console.error("Error Message: " + errData.data.error.message);
        // handle the error
        res.redirect('/paymentpage.html')
        return;
    }
 
    console.log("Payment Status: " + data.paymentStatus);
    res.redirect('/index.html')
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
