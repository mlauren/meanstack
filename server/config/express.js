/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import lusca from 'lusca';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
var MongoStore = connectMongo(session);

export default function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'portfolio'
    })
  }));

  app.use(function(req, res, next) {
    var fileTooLarge = false;
    var handler = multer({
      dest: './client/assets/images/uploads/',
      /*limits: {
        fileSize: 1000000
      },
      onFileSizeLimit: function (file) {
        fileTooLarge = true;
        res.json({
          uploadError: 'Upload failed. File must be less than 50000 KB'
        });
      },*/
      rename: function(fieldname, filename) {
        return filename + Date.now();
      },
      onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting...');
      },
      onFileUploadComplete: function(file, req, res) {
        var fileimage = file.name;
        if(!fileTooLarge) {
          console.log(file.fieldname + ' uploaded to ' + file.path);
          req.middlewareStorage = {
            fileimage: fileimage
          }
        } else {
          fs.unlink('./client/assets/images/uploads/' + fileimage);
        }
      }
    });
    handler(req, res, next);
  });

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if ('test' !== env) {
    app.use(lusca({
      csrf: {
        angular: true
      },
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }

  app.set('appPath', path.join(config.root, 'client'));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if ('development' === env) {
    app.use(require('connect-livereload')());
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
}
