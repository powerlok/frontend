import "moment/locale/pt-br";
var moment = require('moment');
moment.locale('pt-br');

const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
        algoritmo: "aes256",
        codificacao: "utf8",
        segredo: "chaves",
        tipo: "hex"
};

export function handleResponse(response) {
        return response.text().then(text => { //console.log(text);
                const data = text && JSON.parse(text);
                if (!response.ok) {
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                }

                return data;
        });
}

export function diaSemana(data) {
        var dia = moment(data).format("LLLL");
        var _nomedodia = dia.split(',');
        return _nomedodia[0];
}

export function descriptografar(senha) {
        var decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
        var l = decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
        return l += decipher.final();
}

export function criptografar(senha) {
        var cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
        cipher.update(senha);
        return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
}

export function toFixed(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
}

export function download(uri, callback) {
        var request = require('request').defaults({ encoding: null });

        request.get(uri, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                        var data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                        callback(data);
                }
        });
}

export function dateToEN(data, hora) {
        var _data = data.split("/");
        var dia = _data[0];
        var mes = _data[1];
        var _d = _data[2].split(" ");
        var ano = _d[0];
        var hora = _d[1];

        if(hora) return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2) + ' ' + hora;
        else return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
}

export function corrigeNumeric(num) {
        if (num != undefined && num != null) {
                if (num != 0) {
                        return num;
                }
        }
        return 0;
}