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

  switch (action.type) {
    case FETCH_ACTORS_STATUS:
      return {
        ...state,
        fetchActorsStatus: action.status
      };

    case FETCH_ACTORS_SUCCESS:
      return {
        ...state,
        actors: action.actorsData.actors,
        actorsTotalCount: action.actorsData.total,
        actorsLikes: action.actorsData.likes
      };

    case FETCH_UP_ACTORS_SUCCESS:
      return {
        ...state,
        actors: [
          ...state.actors,
          ...action.actorsData.actors
        ],
        actorsLikes: [
          ...state.actorsLikes,
          ...action.actorsData.likes
        ]
      };

    case CLEAR_ACTORS:
      return {
        ...state,
        actors: [],
        actorsTotalCount: 0
      };

    case CHANGE_ACTORS_QUERY:
      return {
        ...state,
        actorsQuery: {
          ...state.actorsQuery,
          ...action.params
        }
      };

    case LIKE_ACTOR_STATUS:
      return {
        ...state,
        likeActorStatus: action.status
      };

    case SAVE_ACTOR_LIKE:
      return {
        ...state,
        actorsLikes: [
          ...state.actorsLikes,
          action.actorId
        ]
      };

    case REMOVE_ACTOR_LIKE:
      return {
        ...state,
        actorsLikes: state.actorsLikes.filter(item => item !== action.actorId)
      };

    default:
      return state;
  }
};
