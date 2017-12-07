import Axios from 'axios';
import { apiUrl } from 'Constants/urls';

export const apiFetchActors = ({ params, appendActors }) => (
  Axios.get(`${apiUrl}/actors`, {
    params
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw (error);
    }));

export const apiLikeActor = ({ userId, actorId }) => (
  Axios.post(`${apiUrl}/actors/like`, { userId, actorId })
    .then(data => data)
    .catch((error) => {
      throw (error);
    }));
