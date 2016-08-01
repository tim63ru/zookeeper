import {browserHistory} from 'react-router';
import {ROUTING} from '../constants/Routing';
import {logger} from '../utils/logger';

export const redirect = store => next => action => {
    if (action.type !== ROUTING) {
        return next(action);
    }
    if (!action.redirectUrl || !action.redirectMethod) {
        return next(action);
    }
    logger.debug('1do routing to ' + action.redirectUrl);
    browserHistory[action.redirectMethod](action.redirectUrl);
    return next(action.targetAction);
};

export default redirect;