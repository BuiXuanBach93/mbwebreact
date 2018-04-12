/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {LOAD_LIST_POST} from 'containers/App/constants';
import { reposLoaded, repoLoadingError, topPageLoaded} from 'containers/App/actions';
import {API_CHECK_MAINTAIN_MODE, MAINTAIN_URL} from 'containers/App/constants';
import {POST_INIT_NUNMBER} from './constants';
import {API_LOAD_POST} from 'containers/App/constants';
import {makeSelectCategoryId, makeSelectCategorySettingId, makeSelectTopPageSize} from 'containers/App/selectors';
import request from 'utils/request';

export function* getListPost(action) {

  const requestURL = API_LOAD_POST;

  try {
    console.log("BASE_URL:  ", process.env.BASE_URL);
    var categoryId = yield select(makeSelectCategoryId());
    var categorySettingId = yield select(makeSelectCategorySettingId());
    var topPageSize = yield select(makeSelectTopPageSize());
    var postType = action.postType;
    var cateStDefaultId = action.cateStDefaultId;
    var requestPostData = requestURL ;
    if(topPageSize && topPageSize > 0){
      requestPostData += "&size=" + topPageSize;
    }else{
      requestPostData += "&size=" + POST_INIT_NUNMBER;
    }
    if(categoryId && categoryId > 0){
       requestPostData += "&categoryIdSuper=" + categoryId; 
    }
    if(cateStDefaultId && cateStDefaultId > 0){
      categorySettingId = cateStDefaultId;
    }
    if(categorySettingId && categorySettingId > 0){
      requestPostData += "&categorySettingId=" + categorySettingId; 
    }
    if(postType){
      requestPostData += "&postType=" + postType; 
    }
    const listPostData = yield call(request, requestPostData);

    yield put(topPageLoaded(listPostData));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(topPageLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* listPostData() {
  // console.log("sagas: listpostData" );
  const watcher = yield takeLatest(LOAD_LIST_POST, getListPost);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  listPostData,
];
