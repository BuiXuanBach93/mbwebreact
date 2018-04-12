/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {API_GET_LIST_USER_POST, LOAD_LIST_USER_POST, API_GET_USER_INFO, LOAD_USER_INFO,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL} from 'containers/App/constants';
import {loadListUserPostSuccess, loadListUserPostError, loadUserInfoSuccess, loadUserInfoError} from 'containers/App/actions';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getListUserPost(action) {
  // console.log('Action', action)

  // Select postId from store

  var userId = action.userId
  var page = action.page
  var size = action.size
  const requestURL = API_GET_LIST_USER_POST+ '?userId=' + userId + '&page=' + page + '&size='+ size;

  try {
    // Call our request helper (see 'utils/request')
    const listUserPostData = yield call(request, requestURL);
    // console.log("api : ",listUserPostData);
    yield put(loadListUserPostSuccess(listUserPostData));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(loadListUserPostError(err));
  }
}

export function* getUserData(action) {
  // console.log('Action', action)

  // Select postId from store

  var userId = action.userId
  const requestURL = API_GET_USER_INFO + userId 

  try {
    // Call our request helper (see 'utils/request')
    const userInfoData = yield call(request, requestURL);
    // console.log("api : ",userInfoData);
    yield put(loadUserInfoSuccess(userInfoData));
  } catch (err) {
    yield put(loadUserInfoError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* listUserPostData() {
  const watcher = yield takeLatest(LOAD_LIST_USER_POST, getListUserPost);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* userInfoData() {
  const watcher = yield takeLatest(LOAD_USER_INFO, getUserData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
    listUserPostData,
    userInfoData
];
