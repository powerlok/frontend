import { alertConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
   if(message.message !== undefined ){
     message = message.message;
   }
   
    return { type: alertConstants.SUCCESS, message };
}

function error(message) { 
    if(message.message !== undefined){
        message = message.message;
    }
    
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}