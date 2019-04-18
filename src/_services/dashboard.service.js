import { handleResponse } from '../_helpers/utils';
import {
    authHeader,
    url,
    requestOptions
} from '../_helpers';

export const dashboardService = {
    getFluxoAteHoje,
    getSaldo,
    getConciliacaoPendente,
    getFluxo,
    getDisponibilidadePorConta,
    getNatureza,
    getCentroCusto,
    getGrupo,
    popupDashHistorico
};

function getFluxoAteHoje(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/fluxoatehoje/' + id, request).then(handleResponse);
}

function getSaldo(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/saldo/' + id, request).then(handleResponse);
}

function getConciliacaoPendente(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/conciliacaopendente/' + id, request).then(handleResponse);
}

function getFluxo(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/fluxo/' + id, request).then(handleResponse);
}


function getDisponibilidadePorConta(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/dispporconta/' + id, request).then(handleResponse);
}


function getNatureza(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/natureza/' + id, request).then(handleResponse);
}

function getCentroCusto(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/centrocusto/' + id, request).then(handleResponse);
}

function getGrupo(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/grupo/' + id, request).then(handleResponse);
}



function popupDashHistorico(seqconta, id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/dashboard/popupDashHistorico/' + seqconta + '/' + id, request).then(handleResponse);
}

