import axios from 'axios';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export const signinUser = ({ email, password }, history) => {

    return (dispatch) => {

        // Submit email/password to the server
        axios.post(`${apiUrl}/signin`, { email, password })
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({
                    type: AUTH_USER,
                    data: {
                        id: response.data.id,
                        name: response.data.name
                    }
                });
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
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
        axios.get(`${apiUrl}/signin`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                dispatch({
                    type: AUTH_USER,
                    data: {
                        id: response.data.id,
                        name: response.data.name
                    }
                });
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const signupUser = ({ email, name, password }, history) => {

    return (dispatch) => {

        axios.post(`${apiUrl}/signup`, { email, name, password })
            .then(response => {
                dispatch({
                    type: AUTH_USER,
                    data: {
                        id: response.data.id,
                        name: response.data.name
                    }
                });
                localStorage.setItem('token', response.data.token);
                history.push('/feature');
            })
            .catch(error => {
                dispatch(authError(error.response.data.error));
            })

    }
};

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
};

export const signoutUser = () => {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
};
