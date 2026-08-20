const fs = require('fs');
const axios = require('axios');
const {sumRequestHandler} = require('./sum');

const requestHandler = (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>Calculator</title></head>')
    res.write('<body>')
    res.write('<h1>Welcome to Calculator</h1>')
    res.write('<a href="/calculator">Go to Calculator</a>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
  }
  else if(req.url.toLowerCase() === '/calculator') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>Calculator</title></head>')
    res.write('<body>')
    res.write('<form action="/submit-form" method="POST">')
    res.write('<label for="number1">Number1:</label>')
    res.write('<input type="text" placeholder="Number1" name="number1"><br><br>')
    res.write('<label for="number2">Number2:</label>')
    res.write('<input type="text" placeholder="Number2" name="number2"><br><br>')
    res.write('<input type="submit" value="Sum">')
    res.write('</form>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
    } else if (req.url === '/submit-form' && req.method === 'POST') {
        axios.post('http://localhost:3010/sum', req);
        //return sumRequestHandler(req, res);
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>404</title></head>')
    res.write(`<body>
                    <h1>Page Not Found</h1>
                    <a href="/">Go to Home</a>
                </body>`)
    res.write('</html>')
}; 

module.exports = requestHandler;
