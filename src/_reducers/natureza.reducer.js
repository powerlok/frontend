import {
  naturezaConstants
} from '../_constants';

const initialState = {
  loading: false,
  naturezas: [],
  error: null
}

export function natureza(state = initialState, action) {
  switch (action.type) {
    case naturezaConstants.GETALL_REQUEST:
      return { ...state,
        loading: true
      };
    case naturezaConstants.GETALL_SUCCESS:
      return { ...state,
        naturezas: action.natureza,
        loading: false
      };
    case naturezaConstants.GETALL_FAILURE:
      return { ...state,
        loading: false,
        error: action.error
      };
    case naturezaConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true,
        naturezas: state.naturezas.map(d => d.id === action.id ? { ...d
          } :
          d
        )
      };
    case naturezaConstants.DELETE_SUCCESS:
      // console.log(state.centrocustos.filter(d => d.id != action.id));
      // remove deleted user from state
      return {
        loading: false,
        naturezas: state.naturezas.filter(d => d.id !== action.id)
      };
    case naturezaConstants.DELETE_FAILURE:
      return {
        loading: false,
        naturezas: state.naturezas.map(d => {
          return d
        })
      };
    default:
      return state
  }
}