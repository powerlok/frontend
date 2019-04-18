import { authHeader, url, requestOptions } from '../_helpers';
import { handleResponse} from '../_helpers/utils';

export const traderService = {
    getTraderAllOperacao,
    getSaldoDisponivelPorAteAData,
    add,
    update,
    getByIdTraderOperacao,
    _deleteTraderOperacao,
    getVlrAcumulada,
    getHistorico,
    addHistorico,
    getTraderOperacaoDiaMes
};

function getByIdTraderOperacao(id) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/trader/operacao/operacao/id/' + id, request).then(handleResponse);
}

function getTraderAllOperacao(id, de, ate, seqcontacorrente) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };
    
    return fetch(url + '/trader/operacao/operacao/all/' + id + '/' + de + '/' + ate + '/' + seqcontacorrente, request).then(handleResponse);
}

function getSaldoDisponivelPorAteAData(id, data, seqcontacorrente) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/trader/operacao/operacao/saldo/' + id + '/' + data + '/' + seqcontacorrente, request).then(handleResponse);
}

function add(c) {
    const r = requestOptions("POST", c);
    return fetch(url + '/trader/operacao/operacao/add', r).then(handleResponse);
}


function update(c) { 
    const r = requestOptions("PUT", c);
    return fetch(url + '/trader/operacao/operacao/update', r).then(handleResponse);
}

function _deleteTraderOperacao(id) {
    const request = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(url + '/trader/operacao/operacao/delete/' + id, request).then(handleResponse);
}

function getVlrAcumulada(id, data) {

    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/trader/operacao/operacao/totalacum/' + id + '/' + data, request).then(handleResponse);
}

function getTraderOperacaoDiaMes(tipo, de, ate, seqconta, seqcontacorrente) {

    const request = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(url + '/trader/operacao/operacao/diames/'+tipo+'/'+de+'/'+ate+'/' + seqconta + '/' + seqcontacorrente, request).then(handleResponse);
}

/**************HISTORICO***************** */

function getHistorico(seqconta, seqcontacorrente, de, ate) {
    const request = {
        method: 'GET',
        headers: authHeader()
    };
    
    return fetch(url + '/trader/historico/historico/all/' + seqconta + '/' + seqcontacorrente + '/' + de + '/' + ate, request).then(handleResponse);
}

function addHistorico(c, seqconta, seqcontacorrente) {
    const r = requestOptions("POST", JSON.stringify({ json : c, seqconta, seqcontacorrente }));
    return fetch(url + '/trader/historico/historico/importarHistorico', r).then(handleResponse);
}