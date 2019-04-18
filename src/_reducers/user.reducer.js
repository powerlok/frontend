import { userConstants } from "../_constants";

const initialState = {
  loading: false,
  users: [],
  error: null,
  token: ''
}

export function user(state = initialState, action) { 
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
      case userConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false
      };
    case userConstants.GETBYID_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };

    case userConstants.LOGIN_TOKEN_REQUEST:
      return {
        //loading: true
      };
    case userConstants.LOGIN_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token
      };
    case userConstants.LOGIN_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };
      case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
          loading: true,
          users: state.users.map(d => d.id === action.id ? {
              ...d
          } :
              d
          )
      };
  case userConstants.DELETE_SUCCESS:
      // console.log(state.centrocustos.filter(d => d.id != action.id));
      // remove deleted user from state
      return {
          loading: false,
          users: state.users.filter(d => d.id !== action.id)
      };
  case userConstants.DELETE_FAILURE:
      return {
          loading: false,
          users: state.users.map(d => {
              return d
          })
      };
    default:
      return state;
  }
}
