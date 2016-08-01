import {
    SIGNIN_REQUEST,
    SIGNIN_FAIL,
    SIGNIN_SUCCESS,
    SIGNOUT_SUCCESS
} from '../constants/SignIn'
import {getCurrentUser, setCurrentUser, clearCurrentUser} from '../utils/user'
import User from '../model/User';
import {logger} from '../utils/logger';

const initialState = getCurrentUser();
export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            let user = new User(
                action.data.user.login,
                action.data.user.role,
                action.data.user.token);
            logger.debug('action.data = ' + JSON.stringify(action.data));
            logger.debug('user = ' + JSON.stringify(user));
            setCurrentUser(user);
            return user;
        case SIGNIN_FAIL:
// TODO
            return {};
        case SIGNOUT_SUCCESS:
            logger.debug('in signin reducer');
            clearCurrentUser();
            return {};
        default:
            return state;
    }
}
