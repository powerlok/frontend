import {
  movimentacaoConstants
} from '../_constants';

const initialState = {
  loading: false,
  movimentacoes: [],
  movimentacoesOp: [],
  movimentacoesOpId: [],
  movcontacorrente: [],
  naoConciliadosBB: [],
  movimentacaoConciliacao: [],
  importaCC: '',
  filtrar: false,
  totalOp: 0,
  error: null
}

export function movimentacao(state = initialState, action) {
  switch (action.type) {
    case movimentacaoConstants.REGISTER_REQUEST:
      return { ...state,
        loading: true,
        // filtrar: false
      };
    case movimentacaoConstants.REGISTER_SUCCESS:
      return { ...state,
        //movimentacoes: action.movimentacao,
        //totalOp: action.totalOp,
        loading: false,
        //  filtrar: true
      };
    case movimentacaoConstants.REGISTER_FAILURE:
      return { ...state,
        loading: false,
        error: action.movimentacao,
        //  filtrar: false
      };
    case movimentacaoConstants.GETALL_REQUEST:
      return { ...state,
        loading: true,
        //  filtrar: false
      };
    case movimentacaoConstants.GETALL_SUCCESS:
      return { ...state,
        movimentacoes: action.movimentacao,
        totalOp: action.totalOp,
        de: action.de,
        loading: false,
        // filtrar: true,
      };
    case movimentacaoConstants.GETALL_FAILURE:
      return { ...state,
        loading: false,
        error: action.movimentacao,
        //  filtrar: false
      };
    case movimentacaoConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        loading: true,
        filtrar: false,
        movimentacoes: state.movimentacoes.map(d => d.id === action.id ? { ...d
          } :
          d
        )
      };
    case movimentacaoConstants.DELETE_SUCCESS:
      // console.log(state.movimentacaos.filter(d => d.id != action.id));
      // remove deleted user from state
      return {
        loading: false,
        //totalOp: action.totalOp,
        filtrar: true,
        movimentacoes: state.movimentacoes.filter(d => d.id !== action.id)
      };
    case movimentacaoConstants.DELETE_FAILURE:
      return {
        loading: false,
        filtrar: false,
        movimentacoes: state.movimentacoes.map(d => {
          return d
        })
      };
    case movimentacaoConstants.REGISTEROP_REQUEST:
      return { ...state,
        loading: true,
        // filtrar: false
      };
    case movimentacaoConstants.REGISTEROP_SUCCESS:
      return { ...state,
       // movimentacoesOp: action.movimentacoesOp,
        //totalOp: action.totalOp,
        loading: false,
        // filtrar: true
      };
    case movimentacaoConstants.REGISTEROP_FAILURE:
      return { ...state,
        loading: false,
        error: action.movimentacaoOp,
        //  filtrar: false
      };
    case movimentacaoConstants.GETALLOP_REQUEST:
      return { ...state,
        loading: true
      };
    case movimentacaoConstants.GETALLOP_SUCCESS:
      return { ...state,
        movimentacoesOp: action.movimentacaoOp,
        loading: false,
        //filtrar: false
      };
    case movimentacaoConstants.GETALLOP_FAILURE:
      return { ...state,
        loading: false,
        error: action.movimentacaoOp,
        //filtrar: true
      };
    case movimentacaoConstants.GETTOTALOP_REQUEST:
      return { ...state,
        loading: true,
        //filtrar: false
      };
    case movimentacaoConstants.GETTOTALOP_SUCCESS:
      return { ...state,
        loading: false,
        totalOp: action.totalOp,
      };
    case movimentacaoConstants.GETTOTALOP_FAILURE:
      return { ...state,
        loading: false,
        error: action.totalOp
      };
    case movimentacaoConstants.DELETEMOVOP_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        loading: true,
        filtrar: false,
        movimentacoesOp: state.movimentacoesOp.map(d => d.id === action.id ? { ...d
          } :
          d
        )
      };
    case movimentacaoConstants.DELETEMOVOP_SUCCESS:
      // console.log(state.movimentacaos.filter(d => d.id != action.id));
      // remove deleted user from state
      return {
        ...state,
        loading: false,
        filtrar: true,
        movimentacoesOp: state.movimentacoesOp.filter(d => d.id !== action.id)
      };
    case movimentacaoConstants.DELETEOP_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        filtrar: false,
        movimentacoesOp: state.movimentacoesOp.map(d => {
          if (d.id === action.id) {
            // make copy of user without 'deleting:true' property
            const {
              loading
            } = d;
            // return copy of user with 'deleteError:[error]' property
            return {
              loading,
              error: action.error
            };
          }

          return d;
        })
      };
    case movimentacaoConstants.GETALLOPCC_REQUEST:
      return { ...state,
        loading: true,
        // filtrar: false,
        movcontacorrente: []
      };
    case movimentacaoConstants.GETALLOPCC_SUCCESS:
      return { ...state,
        movcontacorrente: action.movcontacorrente,
        totalOp: action.totalOp,
        loading: false,
        // filtrar: true
      };
    case movimentacaoConstants.GETALLOPCC_FAILURE:
      return { ...state,
        loading: false,
        // filtrar: false,
        movcontacorrente: action.movcontacorrente
      };
    case movimentacaoConstants.GETALLOPID_REQUEST:
      return { ...state,
        loading: true,
        // filtrar: false
      };
    case movimentacaoConstants.GETALLOPID_SUCCESS:
      return { ...state,
        movimentacoesOpId: action.movimentacaoOpId,
        loading: false,
        // filtrar: true
      };
    case movimentacaoConstants.GETALLOPID_FAILURE:
      return { ...state,
        loading: false,
        //filtrar: false,
        error: action.movimentacaoOpId
      };

    case movimentacaoConstants.REGISTERCC_REQUEST:
      return { ...state,
        loading: true,
        // filtrar: false
      };
    case movimentacaoConstants.REGISTERCC_SUCCESS:
      return { ...state,
        //movcontacorrente: action.movimentacao,
        // totalOp: action.totalOp,
        // filtrar: false,
        loading: false
      };
    case movimentacaoConstants.REGISTERCC_FAILURE:
      return { ...state,
        loading: false,
        //filtrar: false,
        error: action.movimentacao
      };
    case movimentacaoConstants.DELETECC_REQUEST:
      return {
        ...state,
        loading: true,
        filtrar: false,
        movcontacorrente: state.movcontacorrente.map(d => d.id === action.id ? { ...d
          } :
          d
        )
      };
    case movimentacaoConstants.DELETECC_SUCCESS:
      return {
        ...state,
        loading: false,
        filtrar: true,
        movcontacorrente: state.movcontacorrente.filter(d => d.id !== action.id)
      };
    case movimentacaoConstants.DELETECC_FAILURE:
      return {
        ...state,
        loading: false,
        filtrar: false,
        movcontacorrente: state.movcontacorrente.map(d => {
          if (d.id === action.id) {
            // make copy of user without 'deleting:true' property
            const {
              loading
            } = d;
            // return copy of user with 'deleteError:[error]' property
            return {
              loading,
              error: action.error
            };
          }

          return d;
        })

      };
    case movimentacaoConstants.GETALLNAT_REQUEST:
      return { ...state,
        loading: true
      };
    case movimentacaoConstants.GETALLNAT_SUCCESS:
      return { ...state,
        movimentacaoNat: action.movnatureza,
        loading: false,
        //filtrar: false
      };
    case movimentacaoConstants.GETALLNAT_FAILURE:
      return { ...state,
        loading: false,
        error: action.movnatureza,
        //filtrar: true
      };
    case movimentacaoConstants.IMPORTA_REQUEST:
      return { ...state,
        loading: true
      };
    case movimentacaoConstants.IMPORTA_SUCCESS:
      return { ...state,
        importaCC: action.importaCC,
        loading: false,
        //filtrar: false
      };
    case movimentacaoConstants.IMPORTA_FAILURE:
      return { ...state,
        loading: false,
        error: action.naoConciliadosBB,
        //filtrar: true
      };
      case movimentacaoConstants.NAOCONCILIADOSBB_REQUEST:
      return { ...state,
        loading: true
      };
    case movimentacaoConstants.NAOCONCILIADOSBB_SUCCESS:
      return { ...state,
        naoConciliadosBB: action.naoConciliadosBB,
        loading: false,
        //filtrar: false
      };
    case movimentacaoConstants.NAOCONCILIADOSBB_FAILURE:
      return { ...state,
        loading: false,
        error: action.naoConciliadosBB,
        //filtrar: true
      };
      case movimentacaoConstants.REGISTER_CONCILIACAO_REQUEST:
      return { ...state,
        loading: true,
        // filtrar: false
      };
    case movimentacaoConstants.REGISTER_CONCILIACAO_SUCCESS:
      return { ...state,
        naoConciliadosBB: state.naoConciliadosBB.filter(d => d.id !== action.id),
        //totalOp: action.totalOp,
        loading: false,
        //  filtrar: true
      };
    case movimentacaoConstants.REGISTER_CONCILIACAO_FAILURE:
      return { ...state,
        loading: false,
        error: action.movimentacao,
        //  filtrar: false
      };
    default:
      return state
  }
}