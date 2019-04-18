
import { contaCorrenteConstants } from '../_constants';
import { contaCorrenteService } from '../_services';
import { alertActions } from './alert.actions';

export const contaCorrenteActions = {
    add,
    getAll,
    getById,
    _delete,
    getBySeqConta
};

function add(json) {
    return dispatch => {
        dispatch(request(json));
        
        var metodo = null;
   
        if(JSON.parse(json).id > '0'){
            metodo = contaCorrenteService.update(json);
        }else{
            metodo = contaCorrenteService.add(json);
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

    function request() { return { type: contaCorrenteConstants.REGISTER_REQUEST } }
    function success(data) { return { type: contaCorrenteConstants.REGISTER_SUCCESS, contacorrente: data } }
    function failure(error) { return { type: contaCorrenteConstants.REGISTER_FAILURE, error } }
}


function getAll(id) {
    return dispatch => {
        dispatch(request());

        contaCorrenteService.getAll(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: contaCorrenteConstants.GETALL_REQUEST } }
    function success(data) { return { type: contaCorrenteConstants.GETALL_SUCCESS, contacorrente: data } }
    function failure(error) { return { type: contaCorrenteConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        contaCorrenteService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: contaCorrenteConstants.GETALL_REQUEST } }
    function success(data) { return { type: contaCorrenteConstants.GETALL_SUCCESS, contacorrente: data } }
    function failure(error) { return { type: contaCorrenteConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        contaCorrenteService._delete(id)
            .then(
                data => dispatch(success(id, data)),
                error => { 
                    dispatch(failure(error.toString()));                
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: contaCorrenteConstants.DELETE_REQUEST} }
    function success(id) { return { type: contaCorrenteConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: contaCorrenteConstants.DELETE_FAILURE, error } }
}

function getBySeqConta(id) {
    return dispatch => {
        dispatch(request());

        contaCorrenteService.getBySeqConta(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: contaCorrenteConstants.GETALL_REQUEST } }
    function success(data) { return { type: contaCorrenteConstants.GETALL_SUCCESS, contacorrente: data } }
    function failure(error) { return { type: contaCorrenteConstants.GETALL_FAILURE, error } }
}

