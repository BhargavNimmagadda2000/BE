const fs = require('fs');

const sumRequestHandler = (req, res) => {
    const body = []
    req.on('data', (chunk) => {
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBuffer = Buffer.concat(body).toString();
        const jsonData = {}
        const params = new URLSearchParams(parsedBuffer);
        const data = Object.fromEntries(params);
        const sum = Number(data.number1) + Number(data.number2);
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>Result</title></head>')
        res.write(`<body>
                    <h1>Your sum is: ${sum}</h1>
                    <a href="/">Go to Home</a>
                </body>`)
        res.write('</html>')
        fs.writeFile('user-input.txt', `Number1: ${data.number1}, Number2: ${data.number2}, Sum: ${sum}`, data => {
            // res.statusCode = 302;
            // res.setHeader('Location', '/');
            return res.end();
        });
    })
}

module.exports = {sumRequestHandler};