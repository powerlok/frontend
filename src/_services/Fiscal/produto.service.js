import { handleResponse} from '../../_helpers/utils';

import {    
    url,
    authHeader,
    requestOptions,
} from '../../_helpers';

export const produtoService = {      
    add,
    update,
    getAll,
    getById,
    _delete,
    get_tipcodigo
};


function add(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/fiscal/produto/add', r).then(handleResponse);
}


function update(c) {

    const r = requestOptions("PUT", c);
    return fetch(url + '/fiscal/produto/update', r).then(handleResponse);
}

function getAll(seqconta) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/produto/all/' +seqconta, request).then(handleResponse);
}

function getById(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/produto/id/' + id, request).then(handleResponse);
}

function _delete(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/produto/delete/' + id, request).then(handleResponse);
}


function get_tipcodigo(seqcliente) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/produto/tipcodigo/' + seqcliente, request).then(handleResponse);
}