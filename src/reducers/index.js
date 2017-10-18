import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { actorsReducer } from 'Reducers/actorsReducer';
import { authReducer } from 'Reducers/authReducer';
import { postsReducer } from 'Reducers/postsReducer';
import { titlesReducer } from 'Reducers/titlesReducer';

export default combineReducers({
    auth: authReducer,
    actors: actorsReducer,
    posts: postsReducer,
    titles: titlesReducer,
    form: formReducer
});
