import {
  grupoConstants
} from '../_constants';

const initialState = {
  loading: false,
  grupos: [],
  error: null
}

export function grupo(state = initialState, action) {
  switch (action.type) {
    case grupoConstants.GETALL_REQUEST:
      return { ...state,
        loading: true
      };
    case grupoConstants.GETALL_SUCCESS:
      return { ...state,
        grupos: action.grupo,
        loading: false
      };
    case grupoConstants.GETALL_FAILURE:
      return { ...state,
        loading: false,
        error: action.grupo
      };
    case grupoConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true,
        grupos: state.grupos.map(d => d.id === action.id ?
          { ...d
          } :
          d
        )
      };
    case grupoConstants.DELETE_SUCCESS:
      // console.log(state.grupos.filter(d => d.id != action.id));
      // remove deleted user from state
      return {
        loading: false,
        grupos: state.grupos.filter(d => d.id !== action.id)
      };
    case grupoConstants.DELETE_FAILURE:
      return {
        loading: false,
        grupos: state.grupos.map(d => {
          return d
        })
      };
    default:
      return state
  }
}