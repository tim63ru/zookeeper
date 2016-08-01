import express from 'express';
import autoLogger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes_oldauth';
import {logger} from './utils/logger';
import config from './config/main';

const port = config.port;

const app = express();

//TODO req.body = undefined if delete this
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log requests to console
app.use(autoLogger(config.autoLoggerOpts));

// change this to main front page later.
/*
app.get('/', (req, res) => {
    res.send('Coming soon...');
});
*/
routes(app);

app.use(express.static(__dirname + '/public'));

app.get(/.*/, function root(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port);
logger.debug('Your server is running on port ' + port + '.');
