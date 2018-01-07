import {
  FETCH_TITLES_STATUS,
  FETCH_TITLES_SUCCESS,
  FETCH_UP_TITLES_SUCCESS,
  CHANGE_TITLES_QUERY
} from 'Constants/actions';

const defaultTitlesState = {
  titles: [],
  titlesQuery: {
    name: '',
    genre: [],
    year: {
      min: 1878,
      max: 2018
    },
    score: {
      min: 1,
      max: 10
    },
    sort: 'year'
  },
  titlesTotalCount: 0,
  fetchTitlesStatus: true
};

export const titlesReducer = (state = defaultTitlesState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_TITLES_STATUS:
      return {
        ...state,
        fetchTitlesStatus: payload.status
      };

    case FETCH_TITLES_SUCCESS:
      return {
        ...state,
        titles: payload.titles,
        titlesTotalCount: payload.count
      };

    case FETCH_UP_TITLES_SUCCESS:
      return {
        ...state,
        titles: [
          ...state.titles,
          ...payload.titles
        ]
      };

    case CHANGE_TITLES_QUERY:
      return {
        ...state,
        titlesQuery: {
          ...state.titlesQuery,
          ...payload.query
        }
      };

    default:
      return state;
  }
};
