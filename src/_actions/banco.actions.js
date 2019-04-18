import { bancoConstants } from '../_constants';
import { bancoService } from '../_services';
import { alertActions } from './alert.actions';

export const bancoActions = {
    getAll
};

function getAll(id) {
    return dispatch => {
        dispatch(request());

        bancoService.getAll(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: bancoConstants.GETALL_REQUEST } }
    function success(data) { return { type: bancoConstants.GETALL_SUCCESS, banco: data } }
    function failure(error) { return { type: bancoConstants.GETALL_FAILURE, error } }
}