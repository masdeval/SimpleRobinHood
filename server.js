var credentials = {
    token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NjgyMTI4MDgsInRva2VuIjoiVnhIcWVZaHdOVG9sUk04M2JmM3cwcTQweXBuZFJMIiwidXNlcl9pZCI6IjllMzA5ZDY5LWE1N2MtNDFmMy05ODZmLWMyZmYxYmUyZDMzMSIsIm9wdGlvbnMiOmZhbHNlLCJsZXZlbDJfYWNjZXNzIjpmYWxzZX0.eSP8qweG7wJHtRRIGTwcJEs7eT571YqNA1EYPxyi7zleMxWyGybUxzdPk0-wNiuf5qYDwqoBiH7zXKZJGaRT-pKS09xDXDfxSfskyGBShdqcg80HfxKwPpiRqflx7sugidQ02BEBABLRzfQFkeWeckskXnLcD1rUnAWVDd4R2JPLIn4buXwwdsa0atyapSf1ogNd6fTFMr6O2MiY12FDKmF-3EKn3Zl1f2nOpHH1sX3f9lOslNHWTUvqRDQ9Dl-I1QaIBRXhgifpOg-E3GovAiCrV4yE549XG0wcyh6vpEbURramK6LXi-oNBZKBoIA4d73_TKvstnKjbxfi00b5Zg"
};



const express = require('express');
const app = express();

var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('public'));
app.use('/simplerobinhood', express.static('public'))

app.get('/simplerobinhood/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/cadastro', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


app.get('/simplerobinhood/portfolio', function (req, res) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   //res.send("teste");

    var Robinhood = require('robinhood')(credentials, function(){
    Robinhood.positions(function(err, response, body){
        if (err){
            res.send(JSON.stringify(err,null,2));
        }else{
	    res.send(JSON.stringify(body));
        }
      });
    });


})

app.get('/simplerobinhood/user', function (req, res) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   //res.send("teste");

 var Robinhood = require('robinhood')(credentials, function(){
    Robinhood.user(function(err, response, body){
        if(err){
            res.send(JSON.stringify(err,null,2));
        }else{
        res.send(JSON.stringify(body));
      }
    });
   });
})

// optional options hash.  If no hash is sent, all orders will be returned.
let options = {
    //updated_at: '2019-08-25',
    //instrument: 'https://api.robinhood.com/instruments/df6c09dc-bb4f-4495-8c59-f13e6eb3641f/'
}

app.get('/simplerobinhood/orders', function (req, res) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   //res.send("teste");

 var Robinhood = require('robinhood')(credentials, function(){
    Robinhood.orders(options,function(err, response, body){
        if(err){
            res.send(JSON.stringify(err,null,2));
        }else{
            res.send(JSON.stringify(body,null,2));
      }
    });
   });
})


app.post('/simplerobinhood/place_order',  urlencodedParser ,function (req, res) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   //res.send("teste");


  var Robinhood = require('robinhood')(credentials, function(){
    var options = {
        type: 'limit',
        quantity: req.body.quantity, 
        bid_price: req.body.bid_price,
        instrument: {
            url: req.body.instrument,
            symbol: req.body.ticker
        }
        // // Optional:
        // trigger: String, // Defaults to "gfd" (Good For Day)
        // time: String,    // Defaults to "immediate"
        // type: String     // Defaults to "market"
    }
    console.log(options);
    Robinhood.place_buy_order(options, function(error, response, body){
        if(error){
            res.send(JSON.stringify(error,null,2));
        }else{
            res.send(JSON.stringify(body,null,2));
        }
    })
  });

})


app.get('/simplerobinhood/get_instrument',  urlencodedParser ,function (req, res) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   //res.send("teste");

    var symbol = req.query.symbol;
    console.log(symbol)
    var Robinhood = require('robinhood')(credentials, function(){
       Robinhood.instruments(symbol,function(err, response, body){
        if(err){
            console.log("Error get instrument " + err);
        }else{
            console.log(body); 
	    var url = JSON.stringify(body);
            console.log(url);
	    res.send(url);

            //    { previous: null,
            //      results:
            //       [ { min_tick_size: null,
            //           splits: 'https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/splits/',
            //           margin_initial_ratio: '0.5000',
            //           url: 'https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/',
            //           quote: 'https://api.robinhood.com/quotes/AAPL/',
            //           symbol: 'AAPL',
            //           bloomberg_unique: 'EQ0010169500001000',
            //           list_date: '1990-01-02',
            //           fundamentals: 'https://api.robinhood.com/fundamentals/AAPL/',
            //           state: 'active',
            //           day_trade_ratio: '0.2500',
            //           tradeable: true,
            //           maintenance_ratio: '0.2500',
            //           id: '450dfc6d-5510-4d40-abfb-f633b7d9be3e',
            //           market: 'https://api.robinhood.com/markets/XNAS/',
            //           name: 'Apple Inc. - Common Stock' } ],
            //      next: null }
        }
    })
  });

})


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
