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

export const actorsReducer = (state = defaultActorsState, action) => {
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
