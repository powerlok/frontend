import {
    dashboardConstants
} from '../_constants';

const initialState = {
    loadingfluxoAteHoje: false,
    loadingSaldo: false,
    loadingConciliacaoPendente: false,
    loadingFluxo: false,
    loadingDispPorConta: false,
    loadingNatureza: false,
    loadingCentroCusto: false,
    loadingGrupo: false,
    loadingHistorico: false,
    historico: [],
    fluxoAteHoje: 0,
    saldo: 0,
    conciliacaoPendente: 0,
    fluxo: 0,
    DispPorConta: [],
    natureza: [],
    centrocusto: [],
    grupo: [],
    error: null
}

export function dashboard(state = initialState, action) {
    switch (action.type) {
        case dashboardConstants.GETALL_FLUXOATEHOJE_REQUEST:
            return { ...state,
                loadingfluxoAteHoje: true
            };
        case dashboardConstants.GETALL_FLUXOATEHOJE_SUCCESS:
            return { ...state,
                fluxoAteHoje: action.data,
                loadingfluxoAteHoje: false
            };
        case dashboardConstants.GETALL_FLUXOATEHOJE_FAILURE:
            return { ...state,
                loadingfluxoAteHoje: false,
                error: action.error
            };

        case dashboardConstants.GETALL_SALDO_REQUEST:
            return { ...state,
                loadingSaldo: true
            };
        case dashboardConstants.GETALL_SALDO_SUCCESS:
            return { ...state,
                saldo: action.data,
                loadingSaldo: false
            };
        case dashboardConstants.GETALL_SALDO_FAILURE:
            return { ...state,
                loadingSaldo: false,
                error: action.error
            };

        case dashboardConstants.GETALL_CONCILIACAOPENDENTE_REQUEST:
            return { ...state,
                loadingConciliacaoPendente: true
            };
        case dashboardConstants.GETALL_CONCILIACAOPENDENTE_SUCCESS:
            return { ...state,
                conciliacaoPendente: action.data,
                loadingConciliacaoPendente: false
            };
        case dashboardConstants.GETALL_CONCILIACAOPENDENTE_FAILURE:
            return { ...state,
                loadingConciliacaoPendente: false,
                error: action.error
            };

        case dashboardConstants.GETALL_FLUXO_REQUEST:
            return { ...state,
                loadingFluxo: true
            };
        case dashboardConstants.GETALL_FLUXO_SUCCESS:
            return { ...state,
                fluxo: action.data,
                loadingFluxo: false
            };
        case dashboardConstants.GETALL_FLUXO_FAILURE:
            return { ...state,
                loadingFluxo: false,
                error: action.error
            };

        case dashboardConstants.GETALL_DISPPORCONTA_REQUEST:
            return { ...state,
                loadingDispPorConta: true
            };
        case dashboardConstants.GETALL_DISPPORCONTA_SUCCESS:
            return { ...state,
                DispPorConta: action.data,
                loadingDispPorConta: false
            };
        case dashboardConstants.GETALL_DISPPORCONTA_FAILURE:
            return { ...state,
                loadingDispPorConta: false,
                error: action.error
            };

        case dashboardConstants.GETALL_NATUREZA_REQUEST:
            return { ...state,
                loadingNatureza: true
            };
        case dashboardConstants.GETALL_NATUREZA_SUCCESS:
            return { ...state,
                natureza: action.data,
                loadingNatureza: false
            };
        case dashboardConstants.GETALL_NATUREZA_FAILURE:
            return { ...state,
                loadingNatureza: false,
                error: action.error
            };

        case dashboardConstants.GETALL_CENTROCUSTO_REQUEST:
            return { ...state,
                loadingCentroCusto: true
            };
        case dashboardConstants.GETALL_CENTROCUSTO_SUCCESS:
            return { ...state,
                centrocusto: action.data,
                loadingCentroCusto: false
            };
        case dashboardConstants.GETALL_CENTROCUSTO_FAILURE:
            return { ...state,
                loadingCentroCusto: false,
                error: action.error
            };

        case dashboardConstants.GETALL_GRUPO_REQUEST:
            return { ...state,
                loadingGrupo: true
            };
        case dashboardConstants.GETALL_GRUPO_SUCCESS:
            return { ...state,
                grupo: action.data,
                loadingGrupo: false
            };
        case dashboardConstants.GETALL_GRUPO_FAILURE:
            return { ...state,
                loadingGrupo: false,
                error: action.error
            };
            case dashboardConstants.GETALL_HISTORICO_REQUEST:
            return { ...state,
                loadingHistorico: true
            };
        case dashboardConstants.GETALL_HISTORICO_SUCCESS:
            return { ...state,
                historico: action.data,
                loadingHistorico: false
            };
        case dashboardConstants.GETALL_HISTORICO_FAILURE:
            return { ...state,
                loadingHistorico: false,
                error: action.error
            };
        default:
            return state
    }
}