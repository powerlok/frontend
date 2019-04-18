
import { authHeader } from '../_helpers';
export const url = 'http://localhost:8080';
//export const url = 'https://api.orcfacil.com';

export function requestOptions(method,json) {

   return {
        method: method,
        headers: {
             ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: json
    }
}