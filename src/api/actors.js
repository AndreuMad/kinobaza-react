import Axios from 'axios';
import { apiUrl } from 'Constants/urls';

export function apiFetchActors(params) {
  return Axios.get(`${apiUrl}/actors`, {
    params
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}

export function apiLikeActor({ userId, actorId }) {
  return Axios.post(`${apiUrl}/actors/like`, { userId, actorId })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    });
}
