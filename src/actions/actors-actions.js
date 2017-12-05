import Axios from 'axios';

import {
  FETCH_ACTORS_STATUS,
  FETCH_ACTORS_SUCCESS,
  FETCH_UP_ACTORS_SUCCESS,
  CLEAR_ACTORS,
  FETCH_ACTOR_SUCCESS,
  CHANGE_ACTORS_QUERY,
  LIKE_ACTOR_STATUS,
  SAVE_ACTOR_LIKE,
  REMOVE_ACTOR_LIKE
} from 'Constants/actions';

import { apiUrl } from 'Constants/urls';

export const fetchActorsStatus = status => ({
  type: FETCH_ACTORS_STATUS,
  status
});

export const likeActorStatus = status => ({
  type: LIKE_ACTOR_STATUS,
  status
});

export const saveActorLike = actorId => ({
  type: SAVE_ACTOR_LIKE,
  actorId
});

export const removeActorLike = actorId => ({
  type: REMOVE_ACTOR_LIKE,
  actorId
});

export const fetchActorsSuccess = ({ total, actors, likes }) => ({
  type: FETCH_ACTORS_SUCCESS,
  actorsData: {
    total,
    actors,
    likes
  }
});

export const fetchUpActorsSuccess = ({ actors, likes }) => ({
  type: FETCH_UP_ACTORS_SUCCESS,
  actorsData: {
    actors,
    likes
  }
});

export const clearActors = () => ({
  type: CLEAR_ACTORS
});

export const changeActorsQuery = params => ({
  type: CHANGE_ACTORS_QUERY,
  params
});

export const fetchActors = (params, appendActors) => (
  (dispatch) => {
    dispatch(fetchActorsStatus(false));
    return Axios.get(`${apiUrl}/actors`, {
      params
    })
      .then((response) => {
        const { total, actors, likes } = response.data;

        if (appendActors) {
          dispatch(fetchUpActorsSuccess({ actors, likes }));
        } else {
          dispatch(fetchActorsSuccess({ total, actors, likes }));
        }

        dispatch(fetchActorsStatus(true));
      })
      .catch((error) => {
        throw (error);
      });
  });

export const likeActor = ({ userId, actorId }) => (
  (dispatch) => {
    dispatch(likeActorStatus(false));

    return Axios.post(`${apiUrl}/actors/like`, { userId, actorId })
      .then((response) => {
        const { action, actorId } = response.data;

        if (action === 'saved') {
          dispatch(saveActorLike(actorId));
        } else if (action === 'removed') {
          dispatch(removeActorLike(actorId));
        }

        dispatch(likeActorStatus(true));
      })
      .catch((error) => {
        throw (error);
      });
  }
);
