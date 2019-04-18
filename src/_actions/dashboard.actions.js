
import { dashboardConstants } from '../_constants';
import { dashboardService } from '../_services';
import { alertActions } from './alert.actions';

export const dashboardActions = {
    getFluxoAteHoje,
    getSaldo,
    getConciliacaoPendente,
    getDisponibilidadePorConta,
    getNatureza,
    getFluxo,
    getCentroCusto,
    getGrupo,
    popupDashHistorico
};

function getFluxoAteHoje(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getFluxoAteHoje(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_FLUXOATEHOJE_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_FLUXOATEHOJE_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_FLUXOATEHOJE_FAILURE, error } }
}

function getSaldo(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getSaldo(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_SALDO_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_SALDO_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_SALDO_FAILURE, error } }
}

function getConciliacaoPendente(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getConciliacaoPendente(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_CONCILIACAOPENDENTE_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_CONCILIACAOPENDENTE_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_CONCILIACAOPENDENTE_FAILURE, error } }
}


function getFluxo(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getFluxo(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_FLUXO_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_FLUXO_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_FLUXO_FAILURE, error } }
}

function getDisponibilidadePorConta(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getDisponibilidadePorConta(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_DISPPORCONTA_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_DISPPORCONTA_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_DISPPORCONTA_FAILURE, error } }
}

function getNatureza(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getNatureza(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_NATUREZA_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_NATUREZA_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_NATUREZA_FAILURE, error } }
}

function getCentroCusto(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getCentroCusto(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_CENTROCUSTO_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_CENTROCUSTO_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_CENTROCUSTO_FAILURE, error } }
}

function getGrupo(id) {
    return dispatch => {
        dispatch(request());

        dashboardService.getGrupo(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_GRUPO_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_GRUPO_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_GRUPO_FAILURE, error } }
}

function popupDashHistorico(seqconta, id) {
    return dispatch => {
        dispatch(request());

        dashboardService.popupDashHistorico(seqconta, id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dashboardConstants.GETALL_HISTORICO_REQUEST } }
    function success(data) { return { type: dashboardConstants.GETALL_HISTORICO_SUCCESS, data } }
    function failure(error) { return { type: dashboardConstants.GETALL_HISTORICO_FAILURE, error } }
}

