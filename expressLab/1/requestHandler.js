const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
  console.log('Request Method:', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

// app.use((req, res, next) => {
//   res.send('<h1>Welcome to the Express Server</h1><p>This is a simple Express server.</p>')
// })

app.get('/',(req, res, next) => {
  res.send('<h1>Welcome to the Express Server</h1><p>This is a simple Express server.</p>')
  next();
});

app.get('/contact-us', (req, res) => {
  res.send(`
    <h1>Please give details</h1>
    <form action="/contact-us" method="POST">
      <label for="name">Name:</label>
      <input type="text" placeholder="Name" name="name"><br><br>
      <label for="gender">Gender:</label><br><br>
      <input type="radio" value="male" name="gender"><label for="male">Male</label><br>
      <input type="radio" value="female" name="gender"><label for="female">Female</label><br>
      <input type="submit" value="Submit">
    </form>
  `);
});

app.use(bodyParser.urlencoded());

app.post('/contact-us', (req, res) => {
  console.log(req.body)
});


module.exports = app;