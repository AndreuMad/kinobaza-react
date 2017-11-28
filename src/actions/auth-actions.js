import Axios from 'axios';

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
            .then(({data: {id, name, dateOfBirth, token}}) => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch(authSuccess({id, name, dateOfBirth}));
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
            .then(({data: {id, name, dateOfBirth}}) => {
                dispatch(authSuccess({id, name, dateOfBirth}));
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

        Axios.post(`${apiUrl}/signup`, {email, name, password})
            .then(({data: {id, name, dateOfBirth, token}}) => {
                dispatch(authSuccess({id, name, dateOfBirth}));
                localStorage.setItem('token', token);
                history.push('/feature');
            })
            .catch(error => {
                dispatch(authError(error.response.data.error));
                dispatch(authStatus(true));
            })

    }
};

export const editUser = ({ userId, name, photo, dateOfBirth }) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        Axios.post(
            `${apiUrl}/editUser`,
            { userId, name, photo, dateOfBirth },
            {
                headers: {
                    authorization: token
                }
            }
        )
            .then(() => console.log('success'))
            .catch(error => {
                throw(error);
            });
    }
};

export const authSuccess = ({id, name, dateOfBirth}) => ({
    type: AUTH_USER,
    data: {
        id,
        name,
        dateOfBirth
    }
});

export const authStatus = (status) => ({
    type: AUTH_STATUS,
    status
});

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        error
    }
};

export const signOutUser = () => {
    localStorage.removeItem('token');

    return {type: UNAUTH_USER};
};
