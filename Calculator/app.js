const http = require('http');
const requestHandler = require('./requestHandler');

const server = http.createServer(requestHandler);


const PORT = 3010;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});