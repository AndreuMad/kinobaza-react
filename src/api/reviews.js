import Axios from 'axios';
import { apiUrl } from 'Constants/urls';

export function apiFetchReviews(query) {
  return Axios.get(`${apiUrl}/reviews`, {
    query
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}
