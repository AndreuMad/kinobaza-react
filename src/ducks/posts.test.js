import { select, call, put } from 'redux-saga/effects';
import { fetchPosts } from 'Sagas/posts';
import { apiFetchPosts } from 'Api/posts';

import {
  CALL_FETCH_POSTS,
  CALL_FETCH_POST,
  CALL_CREATE_COMMENT
} from 'Ducks/posts';
import { fetchPostsStatus } from "./posts";

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

  saga.next();

  expect(saga.next().value).toEqual(put(fetchPostsStatus(false)));
  console.log(saga.next().value);
});
