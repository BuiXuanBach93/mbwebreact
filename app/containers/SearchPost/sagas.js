/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { API_SEARCH_POST, SEARCH_POST,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL } from 'containers/App/constants';
import { handleClickSearchPost, handleSearchPostSuccsess, handleSearchPostError } from 'containers/App/actions';
import request from 'utils/request';
var urlencode = require('urlencode');
export function* getListSearchPost(action) {
  // console.log('Action', action)

  try {
    var addrDistrictId = action.addrDistrictId
    var addrProvinceId = action.addrProvinceId
    var categoryIdSuper = action.categoryIdSuper
    var isSameCompany = action.isSameCompany
    var page = action.page
    var postType = action.postType
    var price = action.price
    var size = action.size
    var sortField = action.sortField
    var textSearch = action.textSearch
    var bannerId = action.bannerId

    var requestURL = API_SEARCH_POST + '?page=' + page + '&postType=' + postType + '&size=' + size ;

    if (sortField)
      requestURL += ('&sortField=' + sortField)

    if (textSearch)
      requestURL += ('&textSearch='+  urlencode(textSearch))

    if (isSameCompany)
      requestURL += ('&isSameCompany=' + isSameCompany)
      
    if (price !== null)
      requestURL += ('&price=' + price)

    if (categoryIdSuper > 0)
      requestURL += ('&categoryIdSuper=' + categoryIdSuper)
    if (addrProvinceId > 0) {
      requestURL += ('&addrProvinceId=' + addrProvinceId)
      if (addrDistrictId > 0)
        requestURL += ('&addrDistrictId=' + addrDistrictId)
    }

    if (bannerId)
      requestURL += ('&bannerId=' + bannerId)

    const listPostSearchData = yield call(request, requestURL);
    // console.log("api : ", listPostSearchData);
    yield put(handleSearchPostSuccsess(listPostSearchData));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(handleSearchPostError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* listPostSearchData() {
  const watcher = yield takeLatest(SEARCH_POST, getListSearchPost);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  listPostSearchData
];
