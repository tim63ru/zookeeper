import logatim from 'logatim';
import config from '../config/main';

logatim.setLevel(config.loggerLevel);

logatim.debug = (log) => {
    logatim.blue.bold.debug('DEBUG: ' + log);
}

logatim.info = (log) => {
    logatim.bold.info('INFO: ' + log);
}

export let logger = logatim;
