import Axios from 'axios';
import { apiUrl } from 'Constants/urls';

export const apiFetchPosts = params => (
  Axios.get(`${apiUrl}/posts`, {
    params: {
      ...params
    }
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    })
);

export const apiFetchArticlePost = id => (
  Axios.get(`${apiUrl}/posts/${id}`)
    .then(({ data: { post } }) => post)
    .catch((error) => {
      throw (error);
    })
);

export const apiFetchPost = id => (
  Axios.get(`${apiUrl}/posts/${id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    })
);
