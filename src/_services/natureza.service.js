import { authHeader, url, requestOptions } from '../_helpers';
import { handleResponse} from '../_helpers/utils';

export const naturezaService = {
    add,
    update,
    getAll,
    getById,
    _delete
};

function add(nat) {   
 
    const request = requestOptions("POST", nat);
    
    return fetch(url + '/natureza/add', request).then(handleResponse);
}

function update(c) {

    const r = requestOptions("PUT", c);
    return fetch(url + '/natureza/update', r).then(handleResponse);
}

function getAll(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/natureza/all/id/'+id, request).then(handleResponse);
}

function getById(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/natureza/' + id, request).then(handleResponse);
}

function _delete(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/natureza/delete/' + id, request).then(handleResponse);
}
/*
function handleResponse(response) {// console.log(response);
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