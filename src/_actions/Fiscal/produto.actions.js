import { produtoConstants } from '../../_constants/Fiscal/produto.constants';
import { produtoService } from '../../_services/Fiscal/produto.service';
import { alertActions } from '../alert.actions';

export const produtoActions = {
    add,
    getAll,
    getById,
    _delete,
    get_tipcodigo
};

function add(json) {
    return dispatch => {
        dispatch(request(json));
        
        var metodo = null;
   
        if(JSON.parse(json).id > '0'){
            metodo = produtoService.update(json);
        }else{
            metodo = produtoService.add(json);
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

    function request() { return { type: produtoConstants.REGISTER_REQUEST } }
    function success(data) { return { type: produtoConstants.REGISTER_SUCCESS, produto: data } }
    function failure(error) { return { type: produtoConstants.REGISTER_FAILURE, error } }
}

function getAll(seqconta) {
    return dispatch => {
        dispatch(request());

        produtoService.getAll(seqconta)
            .then(
                data => dispatch(success(data)),
                error => { 
                    dispatch(alertActions.error(error));
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: produtoConstants.GETALL_REQUEST } }
    function success(data) { return { type: produtoConstants.GETALL_SUCCESS, produto: data } }
    function failure(error) { return { type: produtoConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        produtoService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: produtoConstants.GETALL_REQUEST } }
    function success(data) { return { type: produtoConstants.GETALL_SUCCESS, produto: data } }
    function failure(error) { return { type: produtoConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        produtoService._delete(id)
            .then(
                data => dispatch(success(id, data)),
                error => { 
                   // console.log(error.toString());
                    dispatch(failure(error.toString()));
                   // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: produtoConstants.DELETE_REQUEST} }
    function success(id, data) { return { type: produtoConstants.DELETE_SUCCESS, id } }
    function failure(error) { return { type: produtoConstants.DELETE_FAILURE, error } }
}


function get_tipcodigo(seqcliente) {
    return dispatch => {
        dispatch(request());

        produtoService.get_tipcodigo(seqcliente).then(
                data => { 
                    dispatch(success(data));                    
                   // dispatch(alertActions.success(c));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
        );
    };

    function request() { return { type: produtoConstants.GET_TIPCOD_REQUEST } }
    function success(data) { return { type: produtoConstants.GET_TIPCOD_SUCCESS, tipcodigos:data } }
    function failure(error) { return { type: produtoConstants.GET_TIPCOD_FAILURE, error } }
}