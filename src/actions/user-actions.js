import Axios from 'axios';

import {apiUrl} from 'Constants/urls';

export const editUser = ({ userId, name, dateOfBirth }) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        let data = {userId};

        if(name) {
            data.name = name;
        }
        if(dateOfBirth) {
            data.dateOfBirth = dateOfBirth;
        }

        Axios.put(
            `${apiUrl}/user_edit`,
            data,
            {
                headers: {
                    authorization: token
                }
            }
        )
            .then(({data}) => dispatch(changeUserData(data)))
            .catch(error => {
                console.log(error);
                throw(error);
            });
    }
};

export const loadAvatar = ({userId, photo}) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const data = new FormData;
        data.append('userId', userId);
        data.append('photo', photo);

        Axios.post(
            `${apiUrl}/user_avatar`,
            data,
            {
                headers: {
                    authorization: token,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(() => console.log('success'))
            .catch(error => {
                console.log(error);
                throw(error);
            });
    }
};

export const changeUserData = (data) => ({
    type: 'CHANGE_USER_DATA',
    data
});
