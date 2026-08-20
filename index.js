const http = require('http');
const fs = require('fs');

console.log('Starting server...');

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>HOME</title></head>')
    res.write('<body><h1>Welcome to HOME</h1></body>')
    res.write('</html>')
    return res.end();
  } else if(req.url === '/products') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>PRODUCTS</title></head>')
    res.write('<body><h1>Welcome to PRODUCTS</h1></body>')
    res.write('</html>')
    return res.end();
  }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>404</title></head>')
    res.write('<body><h1>NOT FOUND</h1></body>')
    res.write('</html>')
    res.end();

  //console.log(req.url, req.method, req.headers);
  //process.exit();
}); 

const PORT = 3001
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});