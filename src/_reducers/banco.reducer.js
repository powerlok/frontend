import {
    bancoConstants
} from '../_constants';

const initialState = {
    loading: false,
    bancos: [],
    error: null
}

export function banco(state = initialState, action) {
    switch (action.type) {
        case bancoConstants.GETALL_REQUEST:
            return { ...state,
                loading: true
            };
        case bancoConstants.GETALL_SUCCESS:
            return { ...state,
                bancos: action.banco,
                loading: false
            };
        case bancoConstants.GETALL_FAILURE:
            return { ...state,
                loading: false,
                error: action.banco
            };
        default:
            return state
    }
}