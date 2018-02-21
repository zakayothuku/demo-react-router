import {userService} from "../_services/user.service";
import {userConstants} from "../_constants/user.constants";
import {alertActions} from "./alerts.actions";

export const userActions = {
    login,
    logout,
    register,
    reset
};

function login(phone_number, password) {
    return dispatch => {
        dispatch(request({phone_number: phone_number}));

        userService.login(phone_number, password)
            .then(
                user => {
                    dispatch(success(user));
                    window.history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

function logout() {
    userService.logout();
    return {type: userConstants.LOGOUT};
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    window.history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {
        return {type: userConstants.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }
}

function reset(email) {
    return dispatch => {
        dispatch(request(email));

        userService.reset(email)
            .then(
                email => {
                    dispatch(success());
                    window.history.push('/login');
                    dispatch(alertActions.success('Your new pin has been sent to your email.'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {
        return {type: userConstants.RESET_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.RESET_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.RESET_FAILURE, error}
    }
}
