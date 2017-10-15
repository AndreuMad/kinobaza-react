import {
    FETCH_TITLES_STATUS,
    FETCH_TITLES_SUCCESS,
    FETCH_UP_TITLES_SUCCESS,
    CLEAR_TITLES,
    CHANGE_TITLES_QUERY
} from 'Constants/actions';

const defaultTitlesState = {
    titles: [],
    titlesTotalCount: 0,
    titlesQuery: {
        name: '',
        genre: [],
        year: {
            min: 1878,
            max: 2017
        },
        score: {
            min: 1,
            max: 10
        }
    },
    titlesParams: {
        year: {
            min: 1878,
            max: 2017
        },
        score: {
            min: 1,
            max: 10
        }
    },
    fetchTitlesStatus: true
};

export const titlesReducer = (state = defaultTitlesState, action) => {

    switch(action.type) {

        case FETCH_TITLES_STATUS:
            return {
                ...state,
                fetchTitlesStatus: action.status
            };

        case FETCH_TITLES_SUCCESS:
            return {
                ...state,
                titles: action.titlesData.titles,
                titlesTotalCount: action.titlesData.count,
                titlesParams: {
                    year: action.titlesData.params.year
                }
            };

        case FETCH_UP_TITLES_SUCCESS:
            return {
                ...state,
                titles: [
                    ...state.titles,
                    ...action.titlesData.titles
                ]
            };

        case CLEAR_TITLES:
            return {
                ...state,
                titles: [],
                titlesTotalCount: 0
            };

        case CHANGE_TITLES_QUERY:
            return {
                ...state,
                titlesQuery: {
                    ...state.titlesQuery,
                    ...action.params
                }
            };

        default:
            return state;
    }
};
