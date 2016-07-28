import passport from 'passport';
import passportConfig from './config/passport';
import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config/main';
import db from './db/main';
import logger from 'winston';


// Set up middleware
const requireAuth = passport.authenticate('jwt', { session: false });

export default function(app) {
    app.use(passport.initialize());
    passportConfig(passport);

    // Create API group routes
    const apiRoutes = express.Router();

    apiRoutes.get('/form', function(req, res) {
        res.send(
            '<!DOCTYPE html>' +
            '<html><body>' +
                'reg1<form method="post" action="/api/reg" enctype="application/x-www-form-urlencoded">' +
                    '<input name="email" type="text" value="tor@ggg.ru">' +
                    '<input name="password" type="text" value="12345">' +
                    '<input type="submit">' +
                '</form>' +
                'auth1<form method="post" action="/api/auth" enctype="application/x-www-form-urlencoded">' +
                    '<input name="email" type="text" value="tor@ggg.ru">' +
                    '<input name="password" type="text" value="12345">' +
                    '<input type="submit">' +
                '</form>' +
            '</body></html>');
    });

    // Register new users
    apiRoutes.post('/reg', function(req, res) {
        logger.debug("Received registration data: " + JSON.stringify(req.body));
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ success: false, message: 'Please enter email and password.' });
        } else {
            db.users[req.body.email] = req.body.password;
            res.status(201).json({ success: true, message: 'Successfully created new user.' });
        }
    });

    // Authenticate the user and get a JSON Web Token to include in the header of future requests.
    apiRoutes.post('/auth', function (req, res) {
        logger.debug("Received auth data: " + JSON.stringify(req.body));
        if (db.users[req.body.email] != undefined) {
            var token = jwt.sign({ email: req.body.email }, config.secret, {
                expiresIn: 60 //100080 // seconds
            });
            res.status(200).json({ success: true, token: token });
        } else {
            res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
    });

    apiRoutes.get('/chat', requireAuth, function (req, res) {
        logger.debug('Valid JWT provided.');
        // res.status(400).json(messages);
        // res.status(200).json({ success: true, token: req.head.authorization });
        res.send('OK!!!' + JSON.stringify(req.user));
    });

    // Set url for API group routes
    app.use('/api', apiRoutes);
};
