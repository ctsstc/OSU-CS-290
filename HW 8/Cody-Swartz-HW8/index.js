const express = require('express');
const bodyParser = require('body-parser');

let app = express();
let handlebars = require('express-handlebars').create({
  defaultLayout:'main',
  extname: '.hbs'
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.all('/', (req, res) => {
  res.render('das-page', {
    method: req.method,
    query: Object.keys(req.body).length == 0 ? req.query : req.body
  });
});

app.post('/', (req, res) => {
  res.render('post');
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});