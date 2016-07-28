import express from 'express';
import autoLogger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import logger from 'winston';
import config from './config/main';

logger.level = config.loggerLevel;

const port = config.port;

const app = express();

//TODO req.body = undefined if delete this
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log requests to console
app.use(autoLogger(config.autoLoggerOpts));

// change this to main front page later.
app.get('/', function(req, res) {
    res.send('Coming soon...');
});

routes(app);

app.use(express.static(__dirname + '/public'));

// Start the server
app.listen(port);
logger.info('Your server is running on port ' + port + '.');
