import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getUserId,
    delete: _delete,
    getUserLogin,
    loginOthers,
    verifyToken,
    add
};

function login(email, senha) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, senha)
            .then(
                user => { //console.log(user);
                    dispatch(success(user));
                    history.push('/admin');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loginOthers(json) {
    return dispatch => {
        dispatch(request(json));

        userService.loginOthers(json)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/admin');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(json) {
    return dispatch => {
        dispatch(request(json));

        userService.register(json)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/admin');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function add(json) {
    return dispatch => {
        dispatch(request(json));
        var metodo;

        if (JSON.parse(json).id > '0') {
            metodo = userService.update(json);
        } else {
            metodo = userService.add(json);
        }
        metodo.then(
                users => { 
                   // dispatch(success(users));
                    dispatch(alertActions.success(users.toString()));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.REGISTER_REQUEST } }
    function success(users) { return { type: userConstants.REGISTER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getUserId(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(users) { return { type: userConstants.GETBYID_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

function getUserLogin() {
    let users = userService.getUserLogin()
    return { type: userConstants.GETUSER_LOGIN, users };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function verifyToken(json) {
    return dispatch => {
        dispatch(request());
        userService.verifyToken(json)
            .then(
                token => { 
                    dispatch(success(token.valid));
                   if(!token.valid) history.push('/');
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_TOKEN_REQUEST } }
    function success(token) { return { type: userConstants.LOGIN_TOKEN_SUCCESS, token } }
    function failure(error) { return { type: userConstants.LOGIN_TOKEN_FAILURE, error } }
}