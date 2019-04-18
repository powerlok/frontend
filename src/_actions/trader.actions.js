import { traderConstants } from '../_constants';
import { traderService } from '../_services';
import { alertActions } from './alert.actions';

export const traderActions = {
    getSaldoDisponivelPorAteAData,
    addTraderOperacao,
    getTraderAllOperacao,
    getByIdTraderOperacao,
    _deleteTraderOperacao,
    getVlrAcumulada,
    getHistorico,
    addHistorico,
    getTraderOperacaoDiaMes
};


function getSaldoDisponivelPorAteAData(seqconta, data, seqcontacorrente) {
    return dispatch => {
        dispatch(request());

        traderService.getSaldoDisponivelPorAteAData(seqconta, data, seqcontacorrente)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: traderConstants.GETALL_TRADER_TOTAL_REQUEST } }
    function success(data) { return { type: traderConstants.GETALL_TRADER_TOTAL_SUCCESS, saldo: data.item.saldo } }
    function failure(error) { return { type: traderConstants.GETALL_TRADER_TOTAL_FAILURE, error } }
}


function getTraderAllOperacao(seqconta, de, ate, seqcontacorrente) {
    return dispatch => {
        dispatch(request());

        traderService.getTraderAllOperacao(seqconta, de, ate, seqcontacorrente)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: traderConstants.GETALL_TRADER_REQUEST } }
    function success(data) { return { type: traderConstants.GETALL_TRADER_SUCCESS, trader: data } }
    function failure(error) { return { type: traderConstants.GETALL_TRADER_FAILURE, error } }
}

function getByIdTraderOperacao(id) {
    return dispatch => {
        dispatch(request());

        traderService.getByIdTraderOperacao(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: traderConstants.GETALL_TRADER_ID_REQUEST } }
    function success(data) { return { type: traderConstants.GETALL_TRADER_ID_SUCCESS, trader: data } }
    function failure(error) { return { type: traderConstants.GETALL_TRADER_ID_FAILURE, error } }
}


function addTraderOperacao(json) {
    return dispatch => {
        dispatch(request(json));

        var metodo = null;

        if (JSON.parse(json).id > '0') {
            metodo = traderService.update(json);
        } else {
            metodo = traderService.add(json);
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
            type: traderConstants.REGISTER_TRADER_FAILURE
        }
    }

    function success(data) {
        return {
            type: traderConstants.REGISTER_TRADER_SUCCESS
        }
    }

    function failure(error) {
        return {
            type: traderConstants.REGISTER_TRADER_FAILURE,
            error
        }
    }
}


function _deleteTraderOperacao(id) {
    return dispatch => {
        dispatch(request(id));
        traderService._deleteTraderOperacao(id)
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
            type: traderConstants.DELETE_TRADER_REQUEST
        }
    }

    function success(id) {
        return {
            type: traderConstants.DELETE_TRADER_SUCCESS,
            id
        }
    }

    function failure(id, error) {
        return {
            type: traderConstants.DELETE_TRADER_FAILURE,
            id,
            error
        }
    }
}

function getVlrAcumulada(seqconta, data) {
    return dispatch => {
        dispatch(request());

        traderService.getVlrAcumulada(seqconta, data)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: traderConstants.GETALL_TRADER_ACUM_REQUEST } }
    function success(data) { 
        return {
            type: traderConstants.GETALL_TRADER_ACUM_SUCCESS, 
            vlrtotalacummeta: data.item.vlrtotalacummeta,
            vlrtotalacumbruto: data.item.vlrtotalacumbruto,
            vlratotalcumliquido: data.item.vlrtotalacumliq,
        }
    }
    function failure(error) { return { type: traderConstants.GETALL_TRADER_ACUM_FAILURE, error } }
}

function getTraderOperacaoDiaMes(tipo, de, ate, seqconta, seqcontacorrente) {
    return dispatch => {
        dispatch(request());

        traderService.getTraderOperacaoDiaMes(tipo, de, ate, seqconta, seqcontacorrente)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: traderConstants.GETALL_TRADER_GRAFICO_DIAMES_REQUEST } }
    function success(data) { return { type: traderConstants.GETALL_TRADER_GRAFICO_DIAMES_SUCCESS, trader: data } }
    function failure(error) { return { type: traderConstants.GETALL_TRADER_GRAFICO_DIAMES_FAILURE, error } }
}

/*****Historico****** */


function getHistorico(seqconta, seqcontacorrente, de, ate) {
    return dispatch => {
        dispatch(request());

        traderService.getHistorico(seqconta, seqcontacorrente, de, ate)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: traderConstants.GETALL_TRADER_HISTORICO_REQUEST } }
    function success(data) { return { type: traderConstants.GETALL_TRADER_HISTORICO_SUCCESS, historico: data } }
    function failure(error) { return { type: traderConstants.GETALL_TRADER_HISTORICO_FAILURE, error } }
}

function addHistorico(json, seqconta, seqcontacorrente) {
    return dispatch => {
        dispatch(request(json));

        traderService.addHistorico(json, seqconta, seqcontacorrente).then(
            c => {
                dispatch(success(c));
                dispatch(alertActions.success(c.toString()));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request() {
        return {
            type: traderConstants.GETALL_TRADER_IMPORT_REQUEST
        }
    }

    function success(data) {
        return {
            type: traderConstants.GETALL_TRADER_IMPORT_SUCCESS,
            importar: data

        }
    }

    function failure(error) {
        return {
            type: traderConstants.GETALL_TRADER_IMPORT_SUCCESS,
            error
        }
    }
}