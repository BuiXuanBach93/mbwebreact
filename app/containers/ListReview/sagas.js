/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { API_GET_LIST_REVIEWS, LOAD_LIST_REVIEWS, API_GET_USER_INFO, LOAD_USER_INFO,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL } from 'containers/App/constants';
import { loadListReviewsSuccess, loadListReviewsError, loadUserInfoSuccess, loadUserInfoError } from 'containers/App/actions';
import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getListReviews(action) {
  // console.log('Action', action)

  // Select postId from store

  var userId = action.userId
  var page = action.page
  var size = action.size
  var userReviewRate = action.userReviewRate

  var requestURL = API_GET_LIST_REVIEWS + '?userId=' + userId + '&page=' + page + '&size=' + size + '&userReviewRate=' + userReviewRate;
  if (userReviewRate === 'ALL')
    requestURL = API_GET_LIST_REVIEWS + '?userId=' + userId + '&page=' + page + '&size=' + size;

  try {
    // Call our request helper (see 'utils/request')
    const listReviewsData = yield call(request, requestURL);
    // console.log("api : ", listReviewsData);
    yield put(loadListReviewsSuccess(listReviewsData));
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
export function* listReviewsData() {
  const watcher = yield takeLatest(LOAD_LIST_REVIEWS, getListReviews);
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
  listReviewsData,
  userInfoData
];
