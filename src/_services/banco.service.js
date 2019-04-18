import { handleResponse} from '../_helpers/utils';

import {
    authHeader,
    url,
    requestOptions
} from '../_helpers';

export const bancoService = {    
    getAll
};


function getAll() {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/banco/all', request).then(handleResponse);
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