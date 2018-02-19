import { select, call } from 'redux-saga/effects';
import { fetchPosts } from 'Sagas/posts';
import { apiFetchPosts } from 'Api/posts';

import {
  CALL_FETCH_POSTS,
  CALL_FETCH_POST,
  CALL_CREATE_COMMENT
} from 'Ducks/posts';

const initialParams = {
  skip: 0,
  limit: 8
};

it('should dispatch', () => {
  const saga = fetchPosts({
    type: CALL_FETCH_POST,
    payload: {
      params: initialParams
    }
  });

  expect(saga.next().value).toEqual(select(({
    posts: { posts }
  }) => ({
    ...initialParams,
    skip: 0,
    shouldLoadArticle: true
  })));
});
