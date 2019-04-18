import {
    traderConstants
} from '../_constants';

const initialState = {
    loading: false,
    traders: [],
    historico: [],
    totais: {},
    error: null,
    saldo: 0,
    vlracummeta: 0,
    vlracumbruto: 0,
    vlracumliquido: 0,
    filtrar: false,
    importar: null,
    graficos: { diames: [] }

}

export function trader(state = initialState, action) {
    switch (action.type) {
        case traderConstants.GETALL_TRADER_REQUEST:
            return {
                ...state,
                loading: true,
                //filtrar: false,
            };
        case traderConstants.GETALL_TRADER_SUCCESS:
            return {
                ...state,
                traders: action.trader.itens,
                totais: action.trader.totais,
                loading: false,
                //filtrar: true
            };
        case traderConstants.GETALL_TRADER_FAILURE:
            return {
                ...state,
                loading: false,
                // filtrar: false,
                error: action.error
            };
        case traderConstants.GETALL_TRADER_HISTORICO_REQUEST:
            return {
                ...state,
                loading: true,
                //filtrar: false,
            };
        case traderConstants.GETALL_TRADER_HISTORICO_SUCCESS:
            return {
                ...state,
                historico: action.historico,
                loading: false,
                //filtrar: true
            };
        case traderConstants.GETALL_TRADER_HISTORICO_FAILURE:
            return {
                ...state,
                loading: false,
                // filtrar: false,
                error: action.error
            };
        case traderConstants.GETALL_TRADER_ID_REQUEST:
            return {
                ...state,
                loading: true,
                //filtrar: false,
            };
        case traderConstants.GETALL_TRADER_ID_SUCCESS:
            return {
                ...state,
                traders: action.trader,
                loading: false,
                //filtrar: true
            };
        case traderConstants.GETALL_TRADER_ID_FAILURE:
            return {
                ...state,
                loading: false,
                // filtrar: false,
                error: action.error
            };
        case traderConstants.GETALL_TRADER_TOTAL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case traderConstants.GETALL_TRADER_TOTAL_SUCCESS:
            return {
                ...state,
                saldo: action.saldo,
                loading: false
            };
        case traderConstants.GETALL_TRADER_TOTAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case traderConstants.GETALL_TRADER_IMPORT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case traderConstants.GETALL_TRADER_IMPORT_SUCCESS:
            return {
                ...state,
                importar: action.importar,
                loading: false
            };
        case traderConstants.GETALL_TRADER_IMPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
      
        case traderConstants.GETALL_TRADER_ACUM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case traderConstants.GETALL_TRADER_ACUM_SUCCESS:
            return {
                ...state,
                vlracummeta: action.vlrtotalacummeta,
                vlracumbruto: action.vlrtotalacumbruto,
                vlracumliquido: action.vlratotalcumliquido,
                loading: false
            };
        case traderConstants.GETALL_TRADER_ACUM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case traderConstants.DELETE_TRADER_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                loading: true,
                traders: state.traders.map(d => d.seqtraderoperacao === action.id ? {
                    ...d
                } :
                    d
                )
            };
        case traderConstants.DELETE_TRADER_SUCCESS:
            // console.log(state.centrocustos.filter(d => d.id != action.id));
            // remove deleted user from state
            return {
                loading: false,
                filtrar: true,
                traders: state.traders.filter(d => d.seqtraderoperacao !== action.id)
            };
        case traderConstants.DELETE_TRADER_FAILURE:
            return {
                loading: false,
                traders: state.traders.map(d => {
                    return d
                })
            };
        case traderConstants.GETALL_TRADER_GRAFICO_DIAMES_REQUEST:
            return {
                ...state,
                loading: true,
                //filtrar: false,
            };
        case traderConstants.GETALL_TRADER_GRAFICO_DIAMES_SUCCESS:
            return {
                ...state,
                graficos: { diames: action.trader },
                loading: false,
                //filtrar: true
            };
        case traderConstants.GETALL_TRADER_GRAFICO_DIAMES_FAILURE:
            return {
                ...state,
                loading: false,
                // filtrar: false,
                error: action.error
            };
        default:
            return state
    }
}