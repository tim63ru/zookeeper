import passport from 'passport';
import passportConfig from './config/passport';
import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config/main';
import db from './db/main';
import {logger} from './utils/logger';
import User from './model/User';
import {decode64, generateHash, checkPassword} from './utils/crypto';

// Set up middleware
const checkAuth = passport.authenticate('jwt', { session: false });

export default function(app) {
    app.use(passport.initialize());
    passportConfig(passport);

    // Create API group routes
    const apiRoutes = express.Router();

    // apiRoutes.get('/form', (req, res) => {
    //     res.send(
    //         '<!DOCTYPE html>' +
    //         '<html><body>' +
    //             'reg1<form method="post" action="/api/reg" enctype="application/x-www-form-urlencoded">' +
    //                 '<input name="email" type="text" value="tor@ggg.ru">' +
    //                 '<input name="password" type="text" value="12345">' +
    //                 '<input type="submit">' +
    //             '</form>' +
    //             'auth1<form method="post" action="/api/auth" enctype="application/x-www-form-urlencoded">' +
    //                 '<input name="email" type="text" value="tor@ggg.ru">' +
    //                 '<input name="password" type="text" value="12345">' +
    //                 '<input type="submit">' +
    //             '</form>' +
    //         '</body></html>');
    // });

    function showPassword(password) {
        return decode64(password);
    }

    // Register new users
    apiRoutes.post('/reg', (req, res) => {
        logger.debug("Received registration data: " + JSON.stringify(req.body));
        if (!req.body.email || !req.body.password) {
            // res.status(400).json({ success: false, message: 'Please enter email and password.' });
            res.sendStatus(400);
        } else {
            let userLogin = req.body.email;
            let userPassword = showPassword(req.body.password);
            const hashedPassword = generateHash(userPassword);
            //TODO real save to DB
            db.users[userLogin] = hashedPassword;
            res.status(201).json({ success: true, message: 'Successfully created new user.' });
        }
    });

    // Authenticate the user and get a JSON Web Token to include in the header of future requests.
    apiRoutes.post('/auth', (req, res) => {
        logger.debug("Received auth data: " + JSON.stringify(req.body));
        let userLogin = req.body.email;
        let userPassword = showPassword(req.body.password);
        logger.debug("userPassword: " + userPassword);
        //TODO real check
        // const dbUser = db.getUser(userLogin);
        // const dbHashedPassword = dbUser.password;
        // const validAccount =  checkPassword(userPassword, dbHashedPassword);
        const validAccount = db.users[userLogin] != undefined;
        if (validAccount) {
            const token = jwt.sign({ email: userLogin }, config.secret, {
                expiresIn: 1160 //100080 // seconds
            });
            const role = 'STUB';
            const user = new User(userLogin, role, token);
            res.status(200).json({success: true, user});
        } else {
            res.sendStatus(401);
            // res.status(401).json({success: false, message: 'Authentication failed. Passwords did not match.' });
        }
    });

    apiRoutes.get('/chat', checkAuth, (req, res) => {
        logger.debug('Valid JWT provided.');
        // res.status(400).json(messages);
        // res.status(200).json({ success: true, token: req.head.authorization });
        res.send('OK!!!' + JSON.stringify(req.user));
    });

    // Set url for API group routes
    app.use('/api', apiRoutes);
};
