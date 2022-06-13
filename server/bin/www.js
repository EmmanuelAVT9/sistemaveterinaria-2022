#!/usr/bin/env node
/**
 * Module dependencies.
 */
/* eslint import/no-unresolved: */
import app from '@s/app';
// Modernizando el script
// var debug = require('debug')('p01-projnotes:server');
import Debug from 'debug';

// var http = require('http');
import http from 'http';

// Importando nuestro logger
import winston from '../config/winston';
// IMportando el objeto de las llaves de configuracion
import configKeys from '../config/configKeys';

// Creando una instancia de debugger
const debug = Debug('p01-projnotes:server');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(configKeys.port || '5000');
// app es una instancia de ExpressJs [ NODE ]
app.set('port', port);

const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winston.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Create HTTP server.
 */

const server = http.createServer(app); // (req, res, next, err)
// => {}      "app es u gran callback"

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bindAdress =
    typeof addr === 'string' ? `pipe ${addr} ` : `port ${addr.port}`;
  debug(`Listening on ${bindAdress}`);
  winston.info(`✍ Servidor escuchando 🤖.. en ${app.get('port')}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port); // Se pone al server a escuchar
// Se registran evento
// si hubiera un error entonces ejecuta un erro
// si se ejecuta el evento listenign entonces escucha
// onError es un Event
/* eslint no-use-before-define: "error" */
server.on('error', onError); // en caso de error
/* eslint no-use-before-define: "error" */
server.on('listening', onListening); //
