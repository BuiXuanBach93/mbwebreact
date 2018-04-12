/**
 * Gets Address
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {API_GET_ADDRESS_INCLUDE_ALL, LOAD_LIST_ADDRESS,API_CHECK_MAINTAIN_MODE, MAINTAIN_URL} from 'containers/App/constants';
import {listAddressLoaded,listAddressLoadingError} from 'containers/App/actions';
import {} from 'containers/App/selectors';

import request from 'utils/request';

export function* getListAddress() {
  const requestURL = API_GET_ADDRESS_INCLUDE_ALL;
  try {
    // console.log("get address by sagas : ", requestURL);
    const listAddressData = yield call(request, requestURL);
    // console.log("list address sagas: ",listAddressData);

    yield put(listAddressLoaded(listAddressData));
  } catch (err) {
    fetch(API_CHECK_MAINTAIN_MODE)
    .then(function(response) {
        if (response.status === 503) {
            window.open(MAINTAIN_URL,"_self");
        }
    })
    yield put(listAddressLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* listAddressData() {
  const watcher = yield takeLatest(LOAD_LIST_ADDRESS, getListAddress);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
 listAddressData
];
