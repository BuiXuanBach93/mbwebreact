/**
 * Gets Category
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {API_GET_CATEGORIES_INCLUDE_ALL, LOAD_LIST_CATEGORY,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL} from 'containers/App/constants';
import {listCategoryLoaded,listCategoryLoadingError} from 'containers/App/actions';
import {} from 'containers/App/selectors';

import request from 'utils/request';

export function* getListCategory() {
  const requestURL = API_GET_CATEGORIES_INCLUDE_ALL;
  try {
    // console.log("get category by sagas : ", requestURL);
    const listCategoryData = yield call(request, requestURL);
    // console.log("list category sagas: ",listCategoryData);

    yield put(listCategoryLoaded(listCategoryData));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(listCategoryLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* listCategoryData() {
  const watcher = yield takeLatest(LOAD_LIST_CATEGORY, getListCategory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
 listCategoryData
];
