/* eslint-disable no-console */

// Preámbulos Ayuda a manejar errores http
// Ayuda a manejar errores http
import createError from 'http-errors';
// var createError = require('http-errors');

// Ayuda a crear seridores web
// var express = require('express');
import express from 'express';

// nucleo de node, ayuda al manejo de las rutas
// var path = require('path');
import path from 'path';

// ayuda al manejo de cookies
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';

// maneja el log de peticiones http
// var logger = require('morgan');
import morgan from 'morgan';

// las rutass
// var indexRouter = require ('./routes/index');
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importando configurador de plantillas
import templateEngineConfigurator from './config/templateEngine';

// Importando enrutador principal
import router from './routes/router';
// Importando nuestro logger
import winston from './config/winston';

// Importando modulos de webpack
// Nucleo de webpack
// Permite incrustar webpack en express
// Permite la actualización dinamica de la página
// Configuración
import webpackConfig from '../webpack.dev.config';
// Importando las variables de configuracion
import configKeys from './config/configKeys';
// Importando clase conectora a la base de datos
import MongooseODM from './config/odm';

// Aqui se crea la instancia de express
// (req, res, next) => {... }
const app = express();

// Recuperar el modo de ejecución
const nodeEnv = process.env.NODE_ENV || 'development';

// Decidiendo si embebemos el webpack middleware
if (nodeEnv === 'development') {
  // Embebiendo webpack a mi aplicación
  console.log(`✍ Ejecutando en modo desarrollo 🤱👶`);

  // Establiendo el modo de webpack en desarrollo
  // en el configurador
  webpackConfig.mode = 'development';

  // Configurando la ruta del HMR (Hot Module Replacemnet)
  // reload=true : Habilita la recarga automatica cuando un archivo Js camboa
  // timeout=1000 : Tiempo de refresco de pagina
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Agregando el plugin a la configuración de desarrollo
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Creando el empaqetador a partir de un objeto de configuración
  const bundler = webpack(webpackConfig);

  // Habilitando el Middleware de webpack en express
  app.use(
    WebpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );

  // Habilitando el Middleware del Webpack HMR
  app.use(WebpackHotMiddleware(bundler));
} else {
  console.log(`✍ Ejecutando en modo producción ⚙⚙`);
}

// Conexion a la base de datos
// Creando una instancia a la conexion de la DB
const mongooseODM = new MongooseODM(configKeys.databaseUrl);
// Ejecutar la conexion a la Bd
// Crear una IIFE para crear un ambito asincrono
// que me permita usar async await
(async () => {
  // Ejecutamos le metodo de conexion
  const connectionResult = await mongooseODM.connect();
  // Checamos si hay error
  if (connectionResult) {
    // Si conecto correctamente a la base de datos
    winston.info('✅ Conexion a la BD exitosa 🤘');
  } else {
    winston.error('😱 No se conecto a la base de datos');
  }
})();

// Configuración del motor de plantilla (template Engine)
// view engine setup
templateEngineConfigurator(app);

app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Middleware de archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

router.addRoutes(app);

// ctrl + k + c  ---------Sirve para comenatr en bloque
// catch 404 and forward to error handler
app.use((req, res, next) => {
  // Registrando el error 404 en el log
  // winston.error(
  //  `404 - Not Found: ${req.method} ${req.originalUrl} : IP ${req.ip}`
  // );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Registramos el error en winston
  winston.error(
    `${err.status || 500} : ${err.message} 
    : ${req.method} ${req.originalUrl} : IP ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// exportando instancia de app.js
// usando javascript moderno
export default app;
