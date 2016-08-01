import {logger} from '../utils/logger';

export function isUserAuthenticated() {
    const user = getCurrentUser();
    logger.debug("user from ls = " + user);
    logger.debug("user from ls = " + JSON.stringify(user));
    if (user) {
        logger.debug("is auth = " + ((user.login && user.role && user.token) ? true : false));
        return (user.login && user.role && user.token) ? true : false;
    }
    return false;
}

function exists(obj) {
    for(let i = 0; i < arguments.length; i++) {
        if (!obj) return false;
    }
    return true;
}

export function getCurrentUser() {
    const user = window.localStorage.getItem('zookeeper_user');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

export function setCurrentUser(user) {
    window.localStorage.setItem('zookeeper_user', JSON.stringify(user));
}

export function clearCurrentUser() {
    logger.debug("in clearCurrentUser   ");
    window.localStorage.removeItem('zookeeper_user');
}