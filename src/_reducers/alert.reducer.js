import { alertConstants } from '../_constants';
//import { history } from '../_helpers';

export function alert(state = {}, action) {  
  if(action.error === "Token expirou" || action.message === "Token expirou"){
    localStorage.removeItem('user');
   // location.reload();
    //return { };
  }
  
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        message: action.success || action.message,
        open: true
      };
    case alertConstants.ERROR:
      return {
        type: 'danger',
        message: action.error || action.message,
        open: true
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}