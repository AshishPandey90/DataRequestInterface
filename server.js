console.log('You started the backend service');
// first: get the library interfaces required for server
const app = require('./backend/app');
const http = require("http");
const debug = require("debug")("node-angular");

// defining method to check requested port is not invalid
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >=0 ) {
    return port;
  }

  return false;
};

// Defining method for proper error handling from server side so that we can debug server starting issues.
const onError = error => {
    if(error.syscall !== "listen"){
    throw error;
    }

  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch(error.code) {
    case "EACCES":
      console.error(bind + "require elevated provileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "address already in use");
      process.exit(1);
      break;
    default:
      throw error;

  }
};

// Defingin method for properly listening to the port or address
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("listening on" + bind);
}

// test your port validity using previously defined method.
const port = normalizePort(process.env.PORT || 3000);
//const port = process.env.PORT || 3000;
// second: define a process/methodolgoy to use the library
// const server = http.createServer((req, res) => {
//   res.end('This is my first response');
// })

app.set('port', port);
const server = http.createServer(app);

// third: expose your server on a specific port defined by some variable or port 3000
//server.listen(process.env.PORT || 3000);

// Configuring your server side interface to handle port, errors....
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

