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

export function callFetchActors(shouldAppend) {
  return {
    type: CALL_FETCH_ACTORS,
    shouldAppend
  };
}

export function fetchActorsStatus(status) {
  return {
    type: FETCH_ACTORS_STATUS,
    status
  };
}

export function fetchActorsSuccess({ total, actors, likes }) {
  return {
    type: FETCH_ACTORS_SUCCESS,
    data: {
      total,
      actors,
      likes
    }
  };
}

export function fetchUpActorsSuccess({ actors, likes }) {
  return {
    type: FETCH_UP_ACTORS_SUCCESS,
    data: {
      actors,
      likes
    }
  };
}

export function clearActors() {
  return {
    type: CLEAR_ACTORS
  };
}

export function callChangeActorsQuery(query) {
  return {
    type: CALL_CHANGE_ACTORS_QUERY,
    query
  };
}

export function changeActorsQuery(query) {
  return {
    type: CHANGE_ACTORS_QUERY,
    query
  };
}

export function callLikeActor({ userId, actorId }) {
  return {
    type: CALL_ACTOR_LIKE,
    userId,
    actorId
  };
}

export function likeActorStatus(status) {
  return {
    type: LIKE_ACTOR_STATUS,
    status
  };
}

export function saveActorLike(actorId) {
  return {
    type: SAVE_ACTOR_LIKE,
    actorId
  };
}

export function removeActorLike(actorId) {
  return {
    type: REMOVE_ACTOR_LIKE,
    actorId
  };
}
