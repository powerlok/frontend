import { integracaoConstants } from '../../_constants/Fiscal/integracao.constants';
import { integracaoService } from '../../_services/Fiscal/integracao.service';
import { alertActions } from './../../_actions/alert.actions';

export const integracaoActions = {
    execIntegracaoClienteOracle,
    getIntegracaoValidacaoProduto,
    execIntegracaoValidacaoProduto,
    add
};

function execIntegracaoClienteOracle(id) {
    return dispatch => {
        dispatch(request());

        integracaoService.execIntegracaoClienteOracle(id)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(alertActions.success(data));
                },
                error =>{ 
                    dispatch(alertActions.error(error));
                    dispatch(failure(error.toString()));
                } 
            );
    };

    function request() { return { type: integracaoConstants.EXEC_INTEGRACAO_REQUEST } }
    function success(data) { return { type: integracaoConstants.EXEC_INTEGRACAO_SUCCESS, data } }
    function failure(error) { return { type: integracaoConstants.EXEC_INTEGRACAO_FAILURE, error } }
}

function getIntegracaoValidacaoProduto(id) {
    return dispatch => {
        dispatch(request());

        integracaoService.getIntegracaoValidacaoProduto(id)
            .then(
                data => { 
                    dispatch(success(data));
                   // dispatch(alertActions.success(data));
                },
                error => {
                  dispatch(alertActions.error(error));
                  dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: integracaoConstants.GET_INTEGRACAO_PRODUTO_REQUEST } }
    function success(data) { return { type: integracaoConstants.GET_INTEGRACAO_PRODUTO_SUCCESS, produtos: data } }
    function failure(error) { return { type: integracaoConstants.GET_INTEGRACAO_PRODUTO_FAILURE, error } }
}


function execIntegracaoValidacaoProduto(id) {
    return dispatch => {
        dispatch(request());

        integracaoService.execIntegracaoValidacaoProduto(id)
            .then(
                data => { 
                    dispatch(success(data));
                    dispatch(alertActions.success(data));
                },
                error => { 
                    dispatch(alertActions.error(error));
                    dispatch(failure(error.toString()));
                }
                //error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: integracaoConstants.EXEC_INTEGRACAO_PRODUTO_REQUEST } }
    function success(data) { return { type: integracaoConstants.EXEC_INTEGRACAO_PRODUTO_SUCCESS, data } }
    function failure(error) { return { type: integracaoConstants.EXEC_INTEGRACAO_PRODUTO_FAILURE, error} }
}

function add(json) {
    return dispatch => {
        dispatch(request(json));
        
        var metodo = null;
   
        if(JSON.parse(json).id > '0'){
            metodo = integracaoService.update(json);
        }else{
            metodo = integracaoService.add(json);
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

    function request() { return { type: integracaoConstants.REGISTER_REQUEST } }
    function success(data) { return { type: integracaoConstants.REGISTER_SUCCESS, data } }
    function failure(error) { return { type: integracaoConstants.REGISTER_FAILURE, error } }
}
