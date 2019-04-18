import {
  centroCustoConstants
} from '../_constants';

const initialState = {
  loading: false,
  centrocustos: [],
  error: null
}

export function centrocusto(state = initialState, action) {
 
  switch (action.type) {
    case centroCustoConstants.GETALL_REQUEST:
      return { ...state,
        loading: true
      };
    case centroCustoConstants.GETALL_SUCCESS:
      return { ...state,
        centrocustos: action.centrocusto,
        loading: false
      };
    case centroCustoConstants.GETALL_FAILURE:
      return { ...state,
        loading: false,
        error: action.centrocusto
      };
    case centroCustoConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true,
        centrocustos: state.centrocustos.map(d => d.id === action.id ?
          { ...d
          } :
          d
        )
      };
    case centroCustoConstants.DELETE_SUCCESS:
      // console.log(state.centrocustos.filter(d => d.id != action.id));
      // remove deleted user from state
      return {
        loading: false,
        centrocustos: state.centrocustos.filter(d => d.id !== action.id)
      };
    case centroCustoConstants.DELETE_FAILURE:
      return {
        loading: false,
        centrocustos: state.centrocustos.map(d => {
          return d
        })
      };
    default:
      return state
  }
}