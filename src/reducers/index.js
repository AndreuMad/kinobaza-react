import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { postsReducer } from './postsReducer';
import { titlesReducer } from './titlesReducer';

export default combineReducers({
    posts: postsReducer,
    titles: titlesReducer,
    form: formReducer
});
