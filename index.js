var express = require('express');
var app = express();
var axios = require('axios');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/getsteps/:token', function(req, res) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + req.params.token;
          axios.get('https://api.fitbit.com/1/user/-/activities/date/2016-11-05.json', {})
                  .then(function (response) {
                    res.json({steps:response.data.summary.steps});
                  })
                  .catch(function (error) {
                    res.send({error: 'epic'})
                  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


