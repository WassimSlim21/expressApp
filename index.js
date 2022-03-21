const express = require("express");
const app = express();
var bodyParser = require('body-parser');

const port = 4000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/api/name/:user_name/:userlastname', function(req,res) {
    res.status(200);
    res.set('Content-type', 'text/html');
    res.send('<html><body>' +
    '<h1>Hello ' + req.params.user_name + req.params.userlastname + '</h1>' +
    '</body></html>'
    );
  });

  app.get('/api/users', function(req, res) {
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;
  
    res.send({
      'user_id': user_id,
      'token': token,
      'geo': geo
    });
  });

  app.post('/api/users', (req, res,next) => {
console.log(req.body);
    if(req.body){
        const user_id = req.body.id;
        const token = req.body.token;
        const geo = req.body.geo;
        
    res.send({
        'user_id': user_id,
        'token': token,
        'geo': geo
      });
    }


  });

app.listen(port || 3000, function() {
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost:%s', 
        port);
  });


 