const fs = require('fs');


const requestHandler = (req, res) => {
  console.log(req.url, req.method);
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
    const body = []
    req.on('data', (chunk) => {
        console.log(chunk)
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBuffer = Buffer.concat(body).toString();
        const jsonData = {}
        const params = new URLSearchParams(parsedBuffer);
        // const data = params.forEach((value, key) => {
        //     jsonData[key] = value;
        // });
        // or use this easier one
        const data = Object.fromEntries(params);
        console.log(data)
        fs.writeFileSync('user-input.txt', JSON.stringify(data));
    })
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
}; 

module.exports = requestHandler;