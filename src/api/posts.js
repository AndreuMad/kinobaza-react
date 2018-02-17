import Axios from 'axios';
import { apiUrl } from 'Constants/urls';

export function apiFetchPosts(params) {
  return Axios.get(`${apiUrl}/posts`, {
    params
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}

export function apiFetchPost(id) {
  return Axios.get(`${apiUrl}/posts/${id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}

export function apiCreateComment({ userId, postId, comment }) {
  const token = localStorage.getItem('token');
  return Axios.post(
    `${apiUrl}/comments`,
    { userId, postId, comment },
    {
      headers: {
        authorization: token
      }
    }
  )
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}
