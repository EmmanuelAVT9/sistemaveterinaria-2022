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
import logger from 'morgan';


// las rutass
// var indexRouter = require ('./routes/index');
import indexRouter from './routes/index';
// var usersRouter = require('./routes/users');
import usersRouter from'./routes/users';
//var aboutRouter = require ('./routes/about');
import aboutRouter from'./routes/about';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Middleware de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

//ctrl + k + c  ---------Sirve para comenatr en bloque
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//exportando instancia de app.js
//usando javascript moderno
export default app;
