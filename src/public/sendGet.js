var reqTarget = 'http://localhost:3000/api/chat';
var token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvckBnZ2cucnUiLCJwYXNzd29yZCI6IjEyMzQ1IiwiaWF0IjoxNDY5NTc1NDc2LCJleHAiOjE0Njk2NzU1NTZ9.Xcgil9GWzdqsPqxd9VFd0c25CO79twoPEaFViD1JXAM';

function sendG() {
    token = document.getElementById('text1').value;
    sendRequest(reqTarget, token, simpleCallback);
}

function simpleCallback(text) {
    console.log('RES: ' + text);
}

function sendRequest(reqTarget, token, callback) {
    console.log('token: ' + token);
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open('GET', reqTarget, true);
    // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.setRequestHeader("authorization", "JWT " + token);
    xhr.setRequestHeader("token", token);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if(xhr.status == 200) {
                callback(xhr.responseText);
            }
        }
    };
    xhr.send();
}