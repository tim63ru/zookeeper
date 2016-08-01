import 'isomorphic-fetch';
import {logger} from '../utils/logger';
import {ROUTING} from '../constants/Routing'

const middleware = store => next => action => {
    if (action.type !== 'PROMISE') {
        logger.debug("in promise action = " + action.type);
        return next(action);
    }
    const [START_ACTION, SUCCESS_ACTION, FAIL_ACTION] = action.actions;
    store.dispatch({
        type: START_ACTION
    });
    action.promise.then(
        (data) => {
            logger.debug('data = ' + JSON.stringify(data));
            logger.debug('action.redirectUrl = ' + action.redirectUrl);
            if (action.redirectUrl) {
                store.dispatch({
                    type: ROUTING,
                    targetAction: {
                        type: SUCCESS_ACTION,
                        data
                    },
                    redirectUrl: action.redirectUrl,
                    redirectMethod: action.redirectMethod
                });
            } else {
                store.dispatch({
                    type: SUCCESS_ACTION,
                    data
                });
            }
        },
        (error) => {
            store.dispatch({
                type: FAIL_ACTION,
                error
            });
        }
    );
}

export default middleware;