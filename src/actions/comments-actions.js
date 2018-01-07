import Axios from 'axios';
import { apiUrl } from 'Constants/urls';
import { POST_COMMENT_SUCCESS } from 'Constants/actions';

export function postCommentSuccess(comment) {
  return {
    type: POST_COMMENT_SUCCESS,
    comment
  };
}

export const postComment = ({ userId: user, postId: post, text }) => (
  (dispatch) => {
    const token = localStorage.getItem('token');

    Axios.post(
      `${apiUrl}/comments`,
      { user, post, text },
      {
        headers: {
          authorization: token
        }
      }
    )
      .then(({ data }) => {
        dispatch(postCommentSuccess(data));
      })
      .catch((error) => {
        throw (error);
      });
  });
