/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import { handleResponse } from '../_helpers/utils';

import {
    authHeader,
    url,
    requestOptions/*,
    descriptografar*/
} from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getUserLogin,
    loginOthers,
    verifyToken,
    add
};

function login(email, senha) {
    const request = requestOptions('POST', JSON.stringify({
        email,
        senha
    }));

    return fetch(url + '/users/autentication', request)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                
            }
            //return descriptografar(user);
            return user;
        });
}

function loginOthers(json) {
    const request = requestOptions("POST", json);

    return fetch(url + '/users/autenticationOthers', request)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) { //console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/users/getAll', request).then(handleResponse);
}

function getById(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/users/getById/' + id, request).then(handleResponse);
}

function getUserLogin() { 
    return localStorage.getItem('user');
}

function register(user) {
    const request = requestOptions("POST",
        user
    );
    //console.log(JSON.stringify(user));
    return fetch(url + '/users/register', request)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) { //console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function add(user) {
    const request = requestOptions("POST",
        user
    );
    
    return fetch(url + '/users/add', request).then(handleResponse);
}


function update(user) {
    const request = requestOptions("PUT",
        user
    );

    return fetch(url + '/users/update', request).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/users/delete/' + id, request).then(handleResponse);
}

function verifyToken(json) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/users/autentication/jwt/' + json, request)
        .then(handleResponse)
        .then(token => { 
            // login successful if there's a jwt token in the response
            if (!token.valid) { //console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.removeItem('user');
            }

            return token;
        });
}