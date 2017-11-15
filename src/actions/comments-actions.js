import Axios from 'axios';
import {apiUrl} from 'Constants/urls';
import {POST_COMMENT_SUCCESS} from 'Constants/actions';

export const postComment = ({userId: user, postId: post, text}) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        Axios.post(
            `${apiUrl}/comments`,
            {
                user,
                post,
                text
            },
            {
                headers: {
                    authorization: token
                }
            }
        )
            .then(({ data }) => {
                dispatch(postCommentSuccess(data));
            })
            .catch(error => {
                throw(error);
            });
    }
};

export const postCommentSuccess = (comment) => ({
    type: POST_COMMENT_SUCCESS,
    comment
});