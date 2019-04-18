import { integracaoConstants } from "../../_constants/Fiscal/integracao.constants";

const initialState = {
  loading: false,
  loadingGrid: false,
  loadingExecValidProd: false,
  loadingCadastro: false,
  integracoes: [],
  produtos: [],
  error: null,
  validar: false
};

export function integracao(state = initialState, action) { 
  switch (action.type) {
    case integracaoConstants.REGISTER_REQUEST:
      return {
        ...state,
        loadingCadastro: true
      };
    case integracaoConstants.REGISTER_SUCCESS:
      return {
        ...state,
        integracao: action.data,
        loadingCadastro: false
      };
    case integracaoConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loadingCadastro: false,
        error: action.data
      };
    case integracaoConstants.EXEC_INTEGRACAO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case integracaoConstants.EXEC_INTEGRACAO_SUCCESS:
      return {
        ...state,
       // integracao: action.integracoes,
        loading: false
      };
    case integracaoConstants.EXEC_INTEGRACAO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data
      };
    case integracaoConstants.GET_INTEGRACAO_PRODUTO_REQUEST:
      return {
        ...state,
        loadingGrid: true
      };
    case integracaoConstants.GET_INTEGRACAO_PRODUTO_SUCCESS:
      return {
        ...state,
        produtos: action.produtos,
        loadingGrid: false
      };
    case integracaoConstants.GET_INTEGRACAO_PRODUTO_FAILURE:
      return {
        ...state,
        loadingGrid: false,
        error: action.data
      };
    case integracaoConstants.EXEC_INTEGRACAO_PRODUTO_REQUEST:
      return {
        ...state,
        loadingExecValidProd: true
      };
    case integracaoConstants.EXEC_INTEGRACAO_PRODUTO_SUCCESS:
      return {
        ...state,
        //produtos: action.integracoes,
        loadingExecValidProd: false
      };
    case integracaoConstants.EXEC_INTEGRACAO_PRODUTO_FAILURE:
      return {
        ...state,
        loadingExecValidProd: false,
        error: action.integracoes
      }; 
    default:
      return state;
  }
}
