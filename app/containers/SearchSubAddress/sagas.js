/**
 * Gets address
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {API_GET_ADDRESS_INCLUDE_ALL, LOAD_LIST_SUBADDRESS,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL} from 'containers/App/constants';
import {listSubAddressLoaded,listSubAddressLoadingError} from 'containers/App/actions';
import {} from 'containers/App/selectors';

import request from 'utils/request';

export function* getListSubAddress(action) {
  var parentId = action.parentId;
  const requestURL = API_GET_ADDRESS_INCLUDE_ALL + '&parentId=' + parentId;
  try {
    const listSubAddressData = yield call(request, requestURL);
    // console.log("url request: ", requestURL);
    // console.log("LIST SUB ADDRESS SAGAS: ",listSubAddressData);

    yield put(listSubAddressLoaded(listSubAddressData));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(listSubAddressLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* listSubAddressData() {
  const watcher = yield takeLatest(LOAD_LIST_SUBADDRESS, getListSubAddress);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
 listSubAddressData
];
