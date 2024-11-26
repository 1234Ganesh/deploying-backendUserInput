const http = require('http');
const userRequestHandler = require('./user')

const PORT = 5000;

const server = http.createServer(userRequestHandler);

server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});