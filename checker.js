
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

/* For Posts */
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
/*           */


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

/* with help from:
 * CS290 Week 7 Lecture Form Handling */
app.get('/', function(req, res) {
	var elements = []; //create Array of query elements
	for (var i in req.query) {
		elements.push({'name': i, 'value': req.query[i]})
	}
	var context = {}; //Create Object 
	context.dataList = elements; // Assign array to object attribute
	context.isGet = true; 
	res.render('home', context); 
});

/* with help from:
 * CS290 Week 7 Lecture Form Handling */
app.post('/', function(req, res){
	var elements = []; //create Array of query elements
	for (var i in req.body){
		elements.push({'name': i,'value':req.body[i]})
	}
	var context = {}; //Create Object
	context.dataList = elements; // Assign array to object attribute
	context.isPost = true;
	res.render('home', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Post/Get Checker started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');

});
