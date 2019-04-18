import { handleResponse} from '../_helpers/utils';
import {
    authHeader,
    url,
    requestOptions
} from '../_helpers';

export const movimentacaoService = {
    add,
    update,
    getAll,
    getAllFiltro,
    getById,
    _delete,
    getSumTotMovOp,
    getAllMovOp,
    addMovOp,
    _deleteMovOp,
    getByIdMovOp,
    getAllMovOpCC,
    addMovCC,
    _deleteMovCC,
    getAllMovOpNat,
    getImportaContaCorrente,
    getNaoConciliadosBB,
    addConciliacao
};


function add(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/movimentacao/add', r).then(handleResponse);
}


function update(c) { 
    const r = requestOptions("PUT", c);
    return fetch(url + '/movimentacao/update', r).then(handleResponse);
}

function getAll(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url + '/movimentacao/all/' + id, request).then(handleResponse);
}

function getAllFiltro(id, de, ate, situacao) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(url + '/movimentacao/allfiltro/' + id + '/' + de + '/' + ate + '/' + situacao, request).then(handleResponse);
}

function getById(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/id/' + id, request).then(handleResponse);
}

function _delete(id, processo, status, de , ate, situacao) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/delete/' + id + '/' + processo + '/' + status + '/' + de + '/' + ate + '/' + situacao, request).then(handleResponse);
}


function getSumTotMovOp() {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/sumoperacao', request).then(handleResponse);
}

function getAllMovOpCC(seqconta, de, ate, seqcontacorrente) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/allMovOpCC/' + seqconta + '/' + de + '/' + ate + '/' + seqcontacorrente, request).then(handleResponse);
}

function getAllMovOp(seqconta, seqmovimentacao) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/allMovOp/' + seqconta + '/' + seqmovimentacao, request).then(handleResponse);
}


function getByIdMovOp(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/idMovOP/' + id, request).then(handleResponse);
}


function addMovOp(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/movimentacao/addMovOp', r).then(handleResponse);
}

function _deleteMovOp(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/deleteMovOp/' + id, request).then(handleResponse);
}

function addMovCC(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/movimentacao/addMovCC', r).then(handleResponse);
}

function _deleteMovCC(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/deleteMovCC/' + id, request).then(handleResponse);
}


function getAllMovOpNat(de, ate, situacao, seqconta, seqnatureza) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/allMovNatureza/'+de+'/'+ate+'/'+situacao+'/' + seqconta + '/' + seqnatureza, request).then(handleResponse);
}

function getImportaContaCorrente(json, seqconta, seqcontacorrente) {

    const r = requestOptions("POST", JSON.stringify({ json, seqconta, seqcontacorrente }));

    return fetch(url + '/movimentacao/importaContaCorrente', r).then(handleResponse);
}

function getNaoConciliadosBB(seqconta, seqcontacorrente) {

    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/movimentacao/validarNaoConciliadosBB/' + seqconta + '/' + seqcontacorrente, request).then(handleResponse);
}

function addConciliacao(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/movimentacao/addConciliacao', r).then(handleResponse);
}


/*
function handleResponse(response) {
    return response.text().then(text => { //console.log(text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
*/