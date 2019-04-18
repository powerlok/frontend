import {
    movimentacaoConstants
} from '../_constants';
import {
    movimentacaoService
} from '../_services';
import {
    alertActions
} from './alert.actions';

export const movimentacaoActions = {
    add,
    getAll,
    getAllFiltro,
    getById,
    _delete,
    getSumTotMovOp,
    getAllMovOp,
    _deleteMovOp,
    addMovOp,
    getByIdMovOp,
    getAllMovOpCC,
    addMovCC,
    _deleteMovCC,
    getAllMovOpNat,
    getImportaContaCorrente,
    getNaoConciliadasBB,
    addConciliacao
};

function add(json) { //console.log(json);
    return dispatch => {
        dispatch(request(json));

        var metodo = null;
        
        if (JSON.parse(json).id > '0') {
            metodo = movimentacaoService.update(json);
        } else {
            metodo = movimentacaoService.add(json);
        }

        metodo.then(
            c => {
                dispatch(success(c));
                dispatch(alertActions.success(c.message));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return {
            type: movimentacaoConstants.REGISTER_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.REGISTER_SUCCESS,
            movimentacao: data.itens,
            totalOp: data.total
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.REGISTER_FAILURE,
            movimentacao: error
        }
    }
}


function getAll(id) {
    return dispatch => {
        dispatch(request());

        movimentacaoService.getAll(id)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETALL_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.GETALL_SUCCESS,
            movimentacao: data.itens,
            totalOp: data.total,
            de: null
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETALL_FAILURE,
            movimentacao: error
        }
    }
}

function getAllFiltro(id, de, ate, situacao) {
    return dispatch => {
        dispatch(request());

        movimentacaoService.getAllFiltro(id, de, ate, situacao)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETALL_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.GETALL_SUCCESS,
            movimentacao: data.itens,
            totalOp: data.total,
            totalOpAnterior: data.totalAnterior,
            de: data.de
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETALL_FAILURE,
            movimentacao: error
        }
    }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        movimentacaoService.getById(id)
            .then(
                data => dispatch(success(data[0])),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETALL_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.GETALL_SUCCESS,
            movimentacao: data,
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETALL_FAILURE,
            movimentacao: error
        }
    }
}

function _delete(id, processo, status, de, ate, situacao) {
    return dispatch => {
        dispatch(request(id));

        movimentacaoService._delete(id, processo, status, de, ate, situacao)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.DELETE_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.DELETE_SUCCESS,
            movimentacao: data.itens,
            totalOp: data.total
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.DELETE_FAILURE,
            movimentacao: error
        }
    }
}

function getSumTotMovOp(id) {
    return dispatch => {
        dispatch(request());

        movimentacaoService.getSumTotMovOp(id)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETTOTALOP_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.GETTOTALOP_SUCCESS,
            totalOp: data
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETTOTALOP_FAILURE,
            totalOp: error
        }
    }
}


function getAllMovOp(seqconta, seqmovimentacao) {
    return dispatch => {
        dispatch(request());

        movimentacaoService.getAllMovOp(seqconta, seqmovimentacao)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETALLOP_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.GETALLOP_SUCCESS,
            movimentacaoOp: data
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETALLOP_FAILURE,
            movimentacaoOp: error
        }
    }
}

function getAllMovOpCC(seqconta, de, ate, seqcontacorrente) { 
    return dispatch => {
        dispatch(request());

        movimentacaoService.getAllMovOpCC(seqconta, de, ate, seqcontacorrente)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETALLOPCC_REQUEST
        }
    }

    function success(data) { //console.log(data);
        return {
            type: movimentacaoConstants.GETALLOPCC_SUCCESS,
            movcontacorrente: data.itens,
            totalOp: data.total,
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETALLOPCC_FAILURE,
            movcontacorrente: error
        }
    }
}

function _deleteMovOp(id) {
    return dispatch => {
        dispatch(request(id));
        movimentacaoService._deleteMovOp(id)
            .then(
                data => dispatch(success(id)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.DELETEOP_REQUEST
        }
    }

    function success(id) {
        return {
            type: movimentacaoConstants.DELETEOP_SUCCESS,
            id
        }
    }

    function failure(id, error) {
        return {
            type: movimentacaoConstants.DELETEOP_FAILURE,
            id,
            error
        }
    }
}

function addMovOp(json) {
    return dispatch => {
        dispatch(request(json));

        movimentacaoService.addMovOp(json).then(
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

    function request() {
        return {
            type: movimentacaoConstants.REGISTEROP_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.REGISTEROP_SUCCESS,
           // movimentacaoOp: data,
           // totalOp: data.total
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.REGISTEROP_FAILURE,
            movimentacaoOp: error
        }
    }
}

function addMovCC(json) {
    return dispatch => {
        dispatch(request(json));

        movimentacaoService.addMovCC(json).then(
            c => { //console.log(c);
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

    function request() {
        return {
            type: movimentacaoConstants.REGISTERCC_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.REGISTERCC_SUCCESS,
            //movimentacao: data,
            //totalOp: data.total
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.REGISTERCC_FAILURE,
            movimentacao: error
        }
    }
}

function _deleteMovCC(id) {
    return dispatch => {
        dispatch(request(id));
        movimentacaoService._deleteMovCC(id)
            .then(
                data => dispatch(success(id)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.DELETECC_REQUEST
        }
    }

    function success(id) {
        return {
            type: movimentacaoConstants.DELETECC_SUCCESS,
            id
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.DELETECC_FAILURE,
            error: error
        }
    }
}

function getByIdMovOp(id) {
    return dispatch => {
        dispatch(request());

        movimentacaoService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETALLOPID_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.GETALLOPID_SUCCESS,
            movimentacaoOpId: data
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETALLOPID_FAILURE,
            movimentacaoOpId: error
        }
    }
}

function getAllMovOpNat(de, ate, situacao, seqconta, seqnatureza) { 
    return dispatch => {
        dispatch(request());

        movimentacaoService.getAllMovOpNat(de, ate, situacao, seqconta, seqnatureza)
            .then(
                data => dispatch(success(data)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.GETALLNAT_REQUEST
        }
    }

    function success(data) { //console.log(data);
        return {
            type: movimentacaoConstants.GETALLNAT_SUCCESS,
            movnatureza: data
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.GETALLNAT_FAILURE,
            movnatureza: error
        }
    }
}

function getImportaContaCorrente(json, seqconta, seqcontacorrente) { 
    return dispatch => {
        dispatch(request());

        movimentacaoService.getImportaContaCorrente(json, seqconta, seqcontacorrente)
            .then(
                data => { dispatch(success(data))
                    dispatch(alertActions.success(data.toString()));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.IMPORTA_REQUEST
        }
    }

    function success(data) { //console.log(data);
        return {
            type: movimentacaoConstants.IMPORTA_SUCCESS,
            importaCC: data
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.IMPORTA_FAILURE,
            importaCC: error
        }
    }
}

function getNaoConciliadasBB(seqconta, seqcontacorrente) { 
    return dispatch => {
        dispatch(request());

        movimentacaoService.getNaoConciliadosBB(seqconta, seqcontacorrente)
            .then(
                data => { dispatch(success(data))
                  //  dispatch(alertActions.success(data.toString()));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    //console.log(error);
                }
            );
    };

    function request() {
        return {
            type: movimentacaoConstants.NAOCONCILIADOSBB_REQUEST
        }
    }

    function success(data) { //console.log(data);
        return {
            type: movimentacaoConstants.NAOCONCILIADOSBB_SUCCESS,
            naoConciliadosBB: data
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.NAOCONCILIADOSBB_FAILURE,
            naoConciliadosBB: error
        }
    }
}

function addConciliacao(json) { //console.log(json);
    return dispatch => {
        dispatch(request(json));
        
        movimentacaoService.addConciliacao(json).then(
            c => {
                dispatch(success(c));
                //dispatch(alertActions.success(c.message));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return {
            type: movimentacaoConstants.REGISTER_CONCILIACAO_REQUEST
        }
    }

    function success(data) {
        return {
            type: movimentacaoConstants.REGISTER_CONCILIACAO_SUCCESS,
            id: data.id
        }
    }

    function failure(error) {
        return {
            type: movimentacaoConstants.REGISTER_CONCILIACAO_FAILURE,
            movimentacaoConciliacao: error
        }
    }
}

