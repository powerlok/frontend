import { clientesConstants } from '../../_constants/Fiscal/clientes.constants';
import { clientesService } from '../../_services/Fiscal/clientes.service';
import { alertActions } from './../../_actions/alert.actions';

export const clientesActions = {
    getConexaoOracle,
    add,
    getAll,
    getById,
    _delete
};

function getConexaoOracle(json) {
    return dispatch => {
        dispatch(request());

        clientesService.getConnectOracle(json)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(alertActions.success(data));
                },
                error => { 
                    dispatch(alertActions.error(error));
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: clientesConstants.GET_CONNECTORACLE_REQUEST } }
    function success(data) { return { type: clientesConstants.GET_CONNECTORACLE_SUCCESS, clientes: data } }
    function failure(error) { return { type: clientesConstants.GET_CONNECTORACLE_FAILURE, error } }
}

function add(json) {
    return dispatch => {
        dispatch(request(json));
        
        var metodo = null;
   
        if(JSON.parse(json).id > '0'){
            metodo = clientesService.update(json);
        }else{
            metodo = clientesService.add(json);
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

    function request() { return { type: clientesConstants.REGISTER_REQUEST } }
    function success(data) { return { type: clientesConstants.REGISTER_SUCCESS, clientes: data } }
    function failure(error) { return { type: clientesConstants.REGISTER_FAILURE, error } }
}

function getAll(seqconta) {
    return dispatch => {
        dispatch(request());

        clientesService.getAll(seqconta)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: clientesConstants.GETALL_REQUEST } }
    function success(data) { return { type: clientesConstants.GETALL_SUCCESS, clientes: data } }
    function failure(error) { return { type: clientesConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        clientesService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: clientesConstants.GETALL_REQUEST } }
    function success(data) { return { type: clientesConstants.GETALL_SUCCESS, clientes: data } }
    function failure(error) { return { type: clientesConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        clientesService._delete(id)
            .then(
                data => dispatch(success(data)),
                error => { 
                   // console.log(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: clientesConstants.DELETE_REQUEST} }
    function success(data) { return { type: clientesConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: clientesConstants.DELETE_FAILURE, error } }
}