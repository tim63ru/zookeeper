import counter from './counter';
import user from './signin';

function issues(state = [], action) {
    switch (action.type) {
        case 'ISSUE_LOADED':
            return action.data;
        default:
            return state;
    }
}

export {counter};
export {issues};
export {user};
