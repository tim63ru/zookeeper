import {getIssues, callSignIn, callSignUp} from '../api/index';
import {encode64, decode64} from '../utils/crypto';
import {
    SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAIL,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL,
    SIGNOUT_SUCCESS
} from '../constants/SignIn';
import {ROUTING} from '../constants/Routing';
import {logger} from '../utils/logger';

export function loadIssues() {
    return {
        type: 'PROMISE',
        actions: ['ISSUE_LOADING', 'ISSUE_LOADED', 'ISSUE_FAIL'],
        promise: getIssues()
    }
};

function hidePassword(password) {
    return encode64(password);
}

export function signIn(user) {
    logger.debug('password_org = ' + user.password);
    user.password = hidePassword(user.password);
    logger.debug('password_e64 = ' + user.password);
    logger.debug('password_d64 = ' + decode64(user.password));

    return {
        type: 'PROMISE',
        actions: [SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAIL],
        promise: callSignIn(user),
        redirectUrl: '/list',
        redirectMethod: 'replace'
    }
};

export function signUp(user) {
    user.password = hidePassword(user.password);
    return {
        type: 'PROMISE',
        actions: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAIL],
        promise: callSignUp(user),
        redirectUrl: '/signin',
        redirectMethod: 'replace'
    }
};

export function signOut() {
    return {
        type: ROUTING,
        targetAction: {
            type: SIGNOUT_SUCCESS,
        },
        redirectUrl: '/signin',
        redirectMethod: 'replace'
    }
}

