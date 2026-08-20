const http = require('http');
const handler = require('./requestHandler');

const server = http.createServer(handler);

const PORT = 3010;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});