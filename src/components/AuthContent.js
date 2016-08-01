import React from 'react';
import {connect} from 'react-redux';
import {ROUTING} from '../constants/Routing';
import {isUserAuthenticated} from '../utils/user'
import {logger} from '../utils/logger';

export default function (Component) {

    class AuthContent extends React.Component {
        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.user);
        }

        checkAuth() {
            logger.debug('isUserAuthenticated = ' + isUserAuthenticated());
            if (!isUserAuthenticated()) {
                this.props.dispatch({
                    type: ROUTING,
                    targetAction: {
                        type: ''
                    },
                    redirectUrl: '/signin',
                    redirectMethod: 'replace'
                });
            }
        }

        render() {
            return (
                <div>
                    {isUserAuthenticated()
                        ? <Component {...this.props} />
                        : null
                    }
                </div>
            );
        }
    }

    return connect()(AuthContent);
}
