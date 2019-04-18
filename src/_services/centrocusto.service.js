import { handleResponse} from '../_helpers/utils';

import {
    authHeader,
    url,
    requestOptions
} from '../_helpers';

export const centroCustoService = {
    add,
    update,
    getAll,
    getById,
    _delete
};


function add(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/centrocusto/add', r).then(handleResponse);
}


function update(c) {

    const r = requestOptions("PUT", c);
    return fetch(url + '/centrocusto/update', r).then(handleResponse);
}

function getAll(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/centrocusto/all/id/' +id, request).then(handleResponse);
}

function getById(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/centrocusto/' + id, request).then(handleResponse);
}

function _delete(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/centrocusto/delete/' + id, request).then(handleResponse);
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
}*/