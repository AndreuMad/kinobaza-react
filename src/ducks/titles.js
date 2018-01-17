// Constants
export const CALL_FETCH_TITLES = 'CALL_FETCH_TITLES';
export const CALL_SET_TITLE_RATING = 'CALL_SET_TITLE_RATING';
export const CALL_CHANGE_TITLES_QUERY = 'CALL_CHANGE_TITLES_QUERY';

const FETCH_TITLES_STATUS = 'FETCH_TITLES_STATUS';
const FETCH_TITLES_SUCCESS = 'FETCH_TITLES_SUCCESS';
const FETCH_UP_TITLES_SUCCESS = 'FETCH_UP_TITLES_SUCCESS';
const FETCH_TITLE_SUCCESS = 'FETCH_TITLE_SUCCESS';
const CHANGE_TITLES_QUERY = 'CHANGE_TITLES_QUERY';

const initialState = {
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

// Actions
export function callFetchTitles(shouldAppend) {
  return {
    type: CALL_FETCH_TITLES,
    payload: {
      shouldAppend
    }
  };
}

export function callChangeTitlesQuery(query) {
  return {
    type: CALL_CHANGE_TITLES_QUERY,
    payload: {
      query
    }
  };
}

export function callSetTitleRating({ titleId, rating }) {
  return {
    type: CALL_SET_TITLE_RATING,
    payload: {
      titleId,
      rating
    }
  };
}

export function fetchTitlesStatus(status) {
  return {
    type: FETCH_TITLES_STATUS,
    payload: {
      status
    }
  };
}

export function fetchTitlesSuccess({ count, titles }) {
  return {
    type: FETCH_TITLES_SUCCESS,
    payload: {
      count,
      titles
    }
  };
}

export function fetchUpTitlesSuccess(titles) {
  return {
    type: FETCH_UP_TITLES_SUCCESS,
    payload: {
      titles
    }
  };
}

export function changeTitlesQuery(query) {
  return {
    type: CHANGE_TITLES_QUERY,
    payload: {
      query
    }
  };
}

// Reducer
export const reducer = (state = initialState, action) => {
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

