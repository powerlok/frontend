import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = { 
    loading: false, 
    user: user ? user : []
};

export function authentication(state = initialState, action) { 
  
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loading: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loading: false
    };
    case userConstants.GETUSER_LOGIN:
      return {         
         user: action.user
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}