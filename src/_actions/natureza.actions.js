import { naturezaConstants } from '../_constants';
import { naturezaService } from '../_services';
import { alertActions } from './alert.actions';

export const naturezaActions = {
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
            metodo = naturezaService.update(json);
        }else{
            metodo = naturezaService.add(json);
        }

        metodo.then(
                c => { 
                    dispatch(success(c));                    
                    dispatch(alertActions.success(c));
                },
                error => {//console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
        );
    };

    function request() { return { type: naturezaConstants.REGISTER_REQUEST } }
    function success(data) { return { type: naturezaConstants.REGISTER_SUCCESS, natureza: data } }
    function failure(error) { return { type: naturezaConstants.REGISTER_FAILURE, error } }
}

function getAll(id) {
    return dispatch => {
        dispatch(request());

        naturezaService.getAll(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: naturezaConstants.GETALL_REQUEST } }
    function success(data) { return { type: naturezaConstants.GETALL_SUCCESS, natureza: data } }
    function failure(error) { return { type: naturezaConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        naturezaService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: naturezaConstants.GETALL_REQUEST } }
    function success(data) { return { type: naturezaConstants.GETALL_SUCCESS, natureza: data } }
    function failure(error) { return { type: naturezaConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        naturezaService._delete(id)
            .then(
                data => dispatch(success(id, data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: naturezaConstants.DELETE_REQUEST } }
    function success(id) { return { type: naturezaConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: naturezaConstants.DELETE_FAILURE, error } }
}