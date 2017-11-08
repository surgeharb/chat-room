/**
 * Constants
 */
const PORT = 9191;

/**
 * Load necessary modules
 */
const host = `Server running on PORT : ${PORT}`;
const express = require('express');
const app = express();

/**
 * Setting the server listening on PORT 9191
 */
let server = app.listen(PORT, () => {
  console.log(host);

  /**
   * Initializes the socket server
   */
  const io = require('socket.io').listen(server);
  const socket = require('./socketServer').init(io);
});