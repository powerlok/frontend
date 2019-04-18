import { handleResponse} from '../../_helpers/utils';

import {    
    url,
    authHeader,
    requestOptions,
} from '../../_helpers';

export const integracaoService = {    
    execIntegracaoClienteOracle,
    getIntegracaoValidacaoProduto,
    execIntegracaoValidacaoProduto,
    add,
    update,  
};


function execIntegracaoClienteOracle(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/integracao/base/' + id, request).then(handleResponse);
}

function getIntegracaoValidacaoProduto(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/integracao/validacao/produto/all/' + id, request).then(handleResponse);
}

function execIntegracaoValidacaoProduto(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/fiscal/integracao/validacao/produto/validar/' + id, request).then(handleResponse);
}

function add(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/fiscal/integracao/base/add', r).then(handleResponse);
}


function update(c) {

    const r = requestOptions("PUT", c);
    return fetch(url + '/fiscal/integracao/base/update', r).then(handleResponse);
}
