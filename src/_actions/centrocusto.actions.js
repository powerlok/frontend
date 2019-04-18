import { centroCustoConstants } from '../_constants';
import { centroCustoService } from '../_services';
import { alertActions } from './alert.actions';

export const CentroCustoActions = {
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
            metodo = centroCustoService.update(json);
        }else{
            metodo = centroCustoService.add(json);
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

    function request() { return { type: centroCustoConstants.REGISTER_REQUEST } }
    function success(data) { return { type: centroCustoConstants.REGISTER_SUCCESS, centrocusto: data } }
    function failure(error) { return { type: centroCustoConstants.REGISTER_FAILURE, error } }
}


function getAll(id) {
    return dispatch => {
        dispatch(request());

        centroCustoService.getAll(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: centroCustoConstants.GETALL_REQUEST } }
    function success(data) { return { type: centroCustoConstants.GETALL_SUCCESS, centrocusto: data } }
    function failure(error) { return { type: centroCustoConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        centroCustoService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: centroCustoConstants.GETALL_REQUEST } }
    function success(data) { return { type: centroCustoConstants.GETALL_SUCCESS, centrocusto: data } }
    function failure(error) { return { type: centroCustoConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        centroCustoService._delete(id)
            .then(
                data => dispatch(success(id, data)),
                error => { 
                   // console.log(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: centroCustoConstants.DELETE_REQUEST} }
    function success(id) { return { type: centroCustoConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: centroCustoConstants.DELETE_FAILURE, error } }
}