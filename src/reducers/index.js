import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { actorsReducer } from 'Reducers/actorsReducer';
import { appReducer } from 'Reducers/appReducer';
import { authReducer } from 'Reducers/authReducer';
import { postsReducer } from 'Reducers/postsReducer';
import { titlesReducer } from 'Reducers/titlesReducer';
import { reviewsReducer } from 'Reducers/reviewsReducer';

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  actors: actorsReducer,
  posts: postsReducer,
  titles: titlesReducer,
  form: formReducer,
  reviews: reviewsReducer
});
