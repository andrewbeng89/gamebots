
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , url = require('url')
  , querystring = require('querystring')
  , http = require('http')
  , btoa = require('btoa');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

// Code verification API using GET method
app.get('/verify', function(req, res) {
	// parse the URL query
	var _get = url.parse(req.url, true).query;

	// Tests ID param
	var tests = (_get['tests']) ? _get['tests'] : undefined;

	// Language param, either 'py' or 'js'
	var lang = (_get['lang']) ? (_get['lang'] === 'py') ? 'python' : 'js' : undefined;

     // Solution param, urlEncoded
    var solution = (_get['solution']) ? _get['solution'] : undefined;
    
	if (tests && lang && solution) {
        // Prepare jsonrequest data
        var data = {
            solution : solution,
            tests : tests
        };
        data = '{"solution":"' + solution + '","tests":"' + tests + '"}';
        
        var host = 'http://ec2-54-251-204-6.ap-southeast-1.compute.amazonaws.com',
            path = '/' + lang,
            jsonrequest = btoa(data);
        var destination = host + path + '?jsonrequest=' + jsonrequest;
        
        var verified_results = '';
        http.get(destination, function(response) {
            // Handle data received
            response.on('data', function(chunk) {
                verified_results += chunk.toString();
            });
            // Send the json response
            response.on("end", function() {
                res.json(JSON.parse(verified_results));
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
	} else {
        res.json({
            error: 'Please check parameters!'
        });
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
