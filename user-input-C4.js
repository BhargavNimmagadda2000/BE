const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>HOME</title></head>')
    res.write('<body>')
    res.write('<form action="/submit-form" method="POST">')
    res.write('<label for="name">Name:</label>')
    res.write('<input type="text" placeholder="Name" name="name"><br><br>')
    res.write('<label for="gender">Gender:</label><br><br>')
    res.write('<input type="radio" value="male" name="gender"><label for="male">Male</label><br>')
    res.write('<input type="radio" value="female" name="gender"><label for="female">Female</label><br>')
    res.write('<input type="submit" value="Submit">')
    res.write('</form>')
    res.write('</body>')
    res.write('</html>')
    return res.end();
  } else if(req.url === '/submit-form' && req.method === 'POST') {
    fs.writeFileSync('user-input.txt', 'User input data')
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>PRODUCTS</title></head>')
    res.write('<body><h1>Welcome to PRODUCTS</h1></body>')
    res.write('</html>')
    res.end();
  }
); 


const PORT = 3001
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});