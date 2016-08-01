import 'isomorphic-fetch';

export function getIssues() {
    return fetch('https://api.github.com/repos/Yomguithereal/baobab/issues')
        .then((r) => r.json());
}

export function callSignIn(user) {
    return fetch('/api/auth', {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({email: user.login, password: user.password})
    }).then((r) => r.json());
}

export function callSignUp(user) {
    return fetch('/api/reg', {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({email: user.login, password: user.password})
    }).then((r) => r.json());
}
