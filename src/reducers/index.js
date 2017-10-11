import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from 'Reducers/authReducer';
import { postsReducer } from 'Reducers/postsReducer';
import { titlesReducer } from 'Reducers/titlesReducer';

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
    titles: titlesReducer,
    form: formReducer
});
