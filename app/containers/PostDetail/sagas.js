/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {LOAD_POST, API_GET_POST_DETAIL,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL} from 'containers/App/constants';
import {postLoaded, postLoadingError } from 'containers/App/actions';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getPost(action) {
  // console.log('Action', action)

  // Select postId from store

  var postId = action.postId
  const requestURL = API_GET_POST_DETAIL + postId;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(postLoaded(response));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(loadListReviewsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* postData() {
  const watcher = yield takeLatest(LOAD_POST, getPost);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);

}

// Bootstrap sagas
export default [
  postData,
];
