import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { reducer as actors } from 'Ducks/actors';
import { reducer as auth } from 'Ducks/auth';
import { reducer as posts } from 'Ducks/posts';
import { reducer as titles } from 'Ducks/titles';
import { reducer as reviews } from 'Ducks/reviews';

export default combineReducers({
  auth,
  actors,
  posts,
  titles,
  form,
  reviews
});
