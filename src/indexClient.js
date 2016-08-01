import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router'
import store from './store/index';
import {logger} from './utils/logger';
import {routes} from './routes';
import {Provider} from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);

store.subscribe(() => {
    logger.debug('New state: ' + JSON.stringify(store.getState()));
});
