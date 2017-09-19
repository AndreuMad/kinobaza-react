import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './authReducer';
import { postsReducer } from './postsReducer';
import { titlesReducer } from './titlesReducer';

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
    titles: titlesReducer,
    form: formReducer
});
