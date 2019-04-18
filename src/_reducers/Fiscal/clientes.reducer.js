import { clientesConstants } from "../../_constants/Fiscal/clientes.constants";

const initialState = {
  loading: false,
  clientes: [],
  conexaoOracle: "",
  error: null
};

export function clientes(state = initialState, action) {
  switch (action.type) {
    case clientesConstants.GET_CONNECTORACLE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case clientesConstants.GET_CONNECTORACLE_SUCCESS:
      return {
        ...state,
        conexaoOracle: action.clientes,
        loading: false
      };
    case clientesConstants.GET_CONNECTORACLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.clientes
      };
    case clientesConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case clientesConstants.GETALL_SUCCESS:
      return {
        ...state,
        clientes: action.clientes,
        loading: false
      };
    case clientesConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.clientes
      };
    case clientesConstants.DELETE_REQUEST:
    return {
      loading: true,
      clientes: state.clientes.map(d => d.id === action.id ?
        { ...d
        } :
        d
      )
    };
    case clientesConstants.DELETE_SUCCESS:
      return {
        loading: false,
        clientes: state.clientes.filter(d => d.id !== action.id)
      };
    case clientesConstants.DELETE_FAILURE:
      return {
        loading: false,
        clientes: state.clientes.map(d => {
          return d
        })
      };
    default:
      return state;
  }
}
