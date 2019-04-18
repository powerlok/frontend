import { grupoConstants } from '../_constants';
import { grupoService } from '../_services';
import { alertActions } from './alert.actions';

export const GrupoActions = {
    add,
    getAll,
    getById,
    _delete
};

function add(json) {
    return dispatch => {
        dispatch(request(json));
        
        var metodo = null;
   
        if(JSON.parse(json).id > '0'){
            metodo = grupoService.update(json);
        }else{
            metodo = grupoService.add(json);
        }

        metodo.then(
                c => { 
                    dispatch(success(c));                    
                    dispatch(alertActions.success(c));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
        );
    };

    function request() { return { type: grupoConstants.REGISTER_REQUEST } }
    function success(data) { return { type: grupoConstants.REGISTER_SUCCESS, grupo: data } }
    function failure(error) { return { type: grupoConstants.REGISTER_FAILURE, error } }
}


function getAll(id) {
    return dispatch => {
        dispatch(request());

        grupoService.getAll(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: grupoConstants.GETALL_REQUEST } }
    function success(data) { return { type: grupoConstants.GETALL_SUCCESS, grupo: data } }
    function failure(error) { return { type: grupoConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        grupoService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: grupoConstants.GETALL_REQUEST } }
    function success(data) { return { type: grupoConstants.GETALL_SUCCESS, grupo: data } }
    function failure(error) { return { type: grupoConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        grupoService._delete(id)
            .then(
                data => dispatch(success(id, data)),
                error => {
                     dispatch(failure(error.toString()));
                     dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: grupoConstants.DELETE_REQUEST } }
    function success(id) { return { type: grupoConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: grupoConstants.DELETE_FAILURE, error } }
}