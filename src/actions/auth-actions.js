import Axios from 'axios';

import {changeUserData} from 'Actions/user-actions';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_STATUS,
    AUTH_ERROR
} from 'Constants/actions';

import {apiUrl} from 'Constants/urls';

export const signInUser = ({email, password}, history) => {

    return (dispatch) => {

        dispatch(authStatus(false));
        // Submit email/password to the server
        Axios.post(`${apiUrl}/signin`, {email, password})
            .then(({data: {user, token}}) => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch(authSuccess());
                dispatch(changeUserData(user));
                dispatch(authStatus(true));
                // - Save the JWT token
                localStorage.setItem('token', token);
                // - redirect to the route /feature''
                history.push('/feature');
            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
};

export const signWithToken = (token) => {
    return (dispatch) => {
        dispatch(authStatus(false));

        Axios.get(`${apiUrl}/signin`, {
            headers: {
                authorization: token
            }
        })
            .then(({data}) => {
                dispatch(authSuccess());
                dispatch(changeUserData(data));
                dispatch(authStatus(true));
            })
            .catch(error => {
                dispatch(authStatus(true));
                throw(error);
            });
    }
};

export const signUpUser = ({email, name, password}, history) => {
    return (dispatch) => {
        dispatch(authStatus(false));

        Axios.post(`${apiUrl}/signup`, {email, name, password})
            .then(({data: {user, token}}) => {
                dispatch(authSuccess());
                dispatch(changeUserData(user));
                dispatch(authStatus(true));
                localStorage.setItem('token', token);
                history.push('/feature');
            })
            .catch(error => {
                dispatch(authError(error.response.data.error));
                dispatch(authStatus(true));
                throw(error);
            })

    }
};

export const authSuccess = () => ({
    type: AUTH_USER
});

export const authStatus = (status) => ({
    type: AUTH_STATUS,
    status
});

export const authError = (error) => ({
    type: AUTH_ERROR,
    error
});

export const signOutUser = () => {
    localStorage.removeItem('token');

    return {type: UNAUTH_USER};
};
