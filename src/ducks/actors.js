// Constants
export const CALL_FETCH_ACTORS = 'CALL_FETCH_ACTORS';
export const CALL_CHANGE_ACTORS_QUERY = 'CALL_CHANGE_ACTORS_QUERY';
export const CALL_ACTOR_LIKE = 'CALL_ACTOR_LIKE';

const FETCH_ACTORS_STATUS = 'FETCH_ACTORS_STATUS';
const FETCH_ACTORS_SUCCESS = 'FETCH_ACTORS_SUCCESS';
const FETCH_UP_ACTORS_SUCCESS = 'FETCH_UP_ACTORS_SUCCESS';
const CLEAR_ACTORS = 'CLEAR_ACTORS';
const FETCH_ACTOR_SUCCESS = 'FETCH_ACTOR_SUCCESS';
const CHANGE_ACTORS_QUERY = 'CHANGE_ACTORS_QUERY';
const LIKE_ACTOR_STATUS = 'LIKE_ACTOR_STATUS';
const SAVE_ACTOR_LIKE = 'SAVE_ACTOR_LIKE';
const REMOVE_ACTOR_LIKE = 'REMOVE_ACTOR_LIKE';

const defaultActorsState = {
  actors: [],
  actorsTotalCount: 0,
  actorsLikes: [],
  actorsQuery: {
    name: ''
  },
  fetchActorsStatus: true,
  likeActorStatus: true
};

// Actions
export function callFetchActors(shouldAppend) {
  return {
    type: CALL_FETCH_ACTORS,
    payload: {
      shouldAppend
    }
  };
}

export function fetchActorsStatus(status) {
  return {
    type: FETCH_ACTORS_STATUS,
    payload: {
      status
    }
  };
}

export function fetchActorsSuccess({ total, actors, likes }) {
  return {
    type: FETCH_ACTORS_SUCCESS,
    payload: {
      total,
      actors,
      likes
    }
  };
}

export function fetchUpActorsSuccess({ actors, likes }) {
  return {
    type: FETCH_UP_ACTORS_SUCCESS,
    payload: {
      actors,
      likes
    }
  };
}

export function callChangeActorsQuery(query) {
  return {
    type: CALL_CHANGE_ACTORS_QUERY,
    payload: {
      query
    }
  };
}

export function changeActorsQuery(query) {
  return {
    type: CHANGE_ACTORS_QUERY,
    payload: {
      query
    }
  };
}

export function callLikeActor({ userId, actorId }) {
  return {
    type: CALL_ACTOR_LIKE,
    payload: {
      userId,
      actorId
    }
  };
}

export function likeActorStatus(status) {
  return {
    type: LIKE_ACTOR_STATUS,
    payload: {
      status
    }
  };
}

export function saveActorLike(actorId) {
  return {
    type: SAVE_ACTOR_LIKE,
    payload: {
      actorId
    }
  };
}

export function removeActorLike(actorId) {
  return {
    type: REMOVE_ACTOR_LIKE,
    payload: {
      actorId
    }
  };
}

// Reducer
export const reducer = (state = defaultActorsState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ACTORS_STATUS:
      return {
        ...state,
        fetchActorsStatus: payload.status
      };

    case FETCH_ACTORS_SUCCESS:
      return {
        ...state,
        actors: payload.actors,
        actorsTotalCount: payload.total,
        actorsLikes: payload.likes
      };

    case FETCH_UP_ACTORS_SUCCESS:
      return {
        ...state,
        actors: [
          ...state.actors,
          ...payload.actors
        ],
        actorsLikes: [
          ...state.actorsLikes,
          ...payload.likes
        ]
      };

    case CHANGE_ACTORS_QUERY:
      return {
        ...state,
        actorsQuery: {
          ...state.actorsQuery,
          ...payload.query
        }
      };

    case LIKE_ACTOR_STATUS:
      return {
        ...state,
        likeActorStatus: payload.status
      };

    case SAVE_ACTOR_LIKE:
      return {
        ...state,
        actorsLikes: [
          ...state.actorsLikes,
          payload.actorId
        ]
      };

    case REMOVE_ACTOR_LIKE:
      return {
        ...state,
        actorsLikes: state.actorsLikes.filter(item => item !== payload.actorId)
      };

    default:
      return state;
  }
};
