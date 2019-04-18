import {
  contaCorrenteConstants
} from '../_constants';

const initialState = {
  loading: false,
  contacorrentes: [],
  error: null
}

export function contacorrente(state = initialState, action) {
  switch (action.type) {
    case contaCorrenteConstants.GETALL_REQUEST:
      return { ...state,
        loading: true
      };
    case contaCorrenteConstants.GETALL_SUCCESS:
      return { ...state,
        contacorrentes: action.contacorrente,
        loading: false
      };
    case contaCorrenteConstants.GETALL_FAILURE:
      return { ...state,
        loading: false,
        error: action.contacorrente
      };
    case contaCorrenteConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true,
        contacorrentes: state.contacorrentes.map(d => d.id === action.id ?
          { ...d
          } :
          d
        )
      };
    case contaCorrenteConstants.DELETE_SUCCESS:
      // console.log(state.contacorrentes.filter(d => d.id != action.id));
      // remove deleted user from state
      return {
        loading: false,
        contacorrentes: state.contacorrentes.filter(d => d.id !== action.id)
      };
    case contaCorrenteConstants.DELETE_FAILURE:
      return {
        loading: false,
        contacorrentes: state.contacorrentes.map(d => {
          return d
        })
      };
    default:
      return state
  }
}