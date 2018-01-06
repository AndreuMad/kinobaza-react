import {
  CALL_FETCH_ACTORS,
  FETCH_ACTORS_STATUS,
  FETCH_ACTORS_SUCCESS,
  FETCH_UP_ACTORS_SUCCESS,
  CLEAR_ACTORS,
  FETCH_ACTOR_SUCCESS,
  CALL_CHANGE_ACTORS_QUERY,
  CHANGE_ACTORS_QUERY,
  CALL_ACTOR_LIKE,
  LIKE_ACTOR_STATUS,
  SAVE_ACTOR_LIKE,
  REMOVE_ACTOR_LIKE
} from 'Constants/actions';

export const callFetchActors = shouldAppend => ({
  type: CALL_FETCH_ACTORS,
  shouldAppend
});

export const fetchActorsStatus = status => ({
  type: FETCH_ACTORS_STATUS,
  status
});

export const fetchActorsSuccess = ({ total, actors, likes }) => ({
  type: FETCH_ACTORS_SUCCESS,
  data: {
    total,
    actors,
    likes
  }
});

export const fetchUpActorsSuccess = ({ actors, likes }) => ({
  type: FETCH_UP_ACTORS_SUCCESS,
  data: {
    actors,
    likes
  }
});

export const clearActors = () => ({
  type: CLEAR_ACTORS
});

export const callChangeActorsQuery = query => ({
  type: CALL_CHANGE_ACTORS_QUERY,
  query
});

export const changeActorsQuery = query => ({
  type: CHANGE_ACTORS_QUERY,
  query
});

export const callLikeActor = ({ userId, actorId }) => ({
  type: CALL_ACTOR_LIKE,
  userId,
  actorId
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
