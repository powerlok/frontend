import { produtoConstants } from "../../_constants/Fiscal/produto.constants";

const initialState = {
  loading: false,
  produtos: [],
  tipcodigos:[],
  conexaoOracle: "",
  error: null
};

export function produto(state = initialState, action) { 
  switch (action.type) {   
    case produtoConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case produtoConstants.GETALL_SUCCESS:
      return {
        ...state,
        produtos: action.produto,
        loading: false
      };
    case produtoConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.produto
      };
    case produtoConstants.DELETE_REQUEST:
    return {
      loading: true,
      produtos: state.produtos.map(d => d.id === action.id ?
        { ...d
        } :
        d
      )
    };
    case produtoConstants.DELETE_SUCCESS:
      return {
        loading: false,
        produtos: state.produtos.filter(d => d.id !== action.id)
      };
    case produtoConstants.DELETE_FAILURE:
      return {
        loading: false,
        produtos: state.produtos.map(d => {
          return d
        })
      };
      case produtoConstants.GET_TIPCOD_REQUEST:
      return {
        ...state
      };
    case produtoConstants.GET_TIPCOD_SUCCESS:
      return {
        ...state,
        tipcodigos: action.tipcodigos,
      };
    case produtoConstants.GET_TIPCOD_FAILURE:
      return {
        ...state,
        error: action.data
      };
    default:
      return state;
  }
}
