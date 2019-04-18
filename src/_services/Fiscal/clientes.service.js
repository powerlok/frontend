import { handleResponse} from '../../_helpers/utils';

import {    
    url,
    authHeader,
    requestOptions,
} from '../../_helpers';

export const clientesService = {    
    getConnectOracle,    
    add,
    update,
    getAll,
    getById,
    _delete
};


function getConnectOracle(json) {
    const request = requestOptions("POST", json);

    return fetch(url + '/fiscal/clientes/get/oracle/connect', request).then(handleResponse);
}

function add(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/fiscal/clientes/add', r).then(handleResponse);
}


function update(c) {

    const r = requestOptions("PUT", c);
    return fetch(url + '/fiscal/clientes/update', r).then(handleResponse);
}

function getAll(seqconta) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/clientes/all/' +seqconta, request).then(handleResponse);
}

function getById(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/clientes/id/' + id, request).then(handleResponse);
}

function _delete(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/clientes/delete/' + id, request).then(handleResponse);
}