/**
 * Gets Category
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {API_GET_CATEGORIES_INCLUDE_ALL, LOAD_LIST_SUBCATEGORY,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL} from 'containers/App/constants';
import {listSubCategoryLoaded,listSubCategoryLoadingError} from 'containers/App/actions';
import {} from 'containers/App/selectors';

import request from 'utils/request';

export function* getListSubCategory(action) {
  var parentId = action.parentId;
  const requestURL = API_GET_CATEGORIES_INCLUDE_ALL + '&parentId=' + parentId;
  try {
    const listSubCategoryData = yield call(request, requestURL);
    // console.log("url request: ", requestURL);
    // console.log("LIST SUB CATEGORY SAGAS: ",listSubCategoryData);

    yield put(listSubCategoryLoaded(listSubCategoryData));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(listSubCategoryLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* listSubCategoryData() {
  const watcher = yield takeLatest(LOAD_LIST_SUBCATEGORY, getListSubCategory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
 listSubCategoryData
];
