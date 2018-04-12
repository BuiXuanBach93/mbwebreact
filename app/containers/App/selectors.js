/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);
const makeSelectPostData = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('postData')
);

const makeSelectListPostData = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listPostData')
);

const makeSelectCategoryId = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('categoryId')
);

const makeSelectCategorySettingId = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('categorySettingId')
);

const makeSelectTopPageSize =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('topPageSize')
);

const makeSelectCategorySearch =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('category')
);

const makeSelectSubCategorySearch =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('subCategory')
);


const makeSelectListCategory =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listCategoryData')
);

const makeSelectListSubCategory =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listSubCategoryData')
);

const makeSelectAddressSearch =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('address')
);

const makeSelectSubAddressSearch =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('subAddress')
);

const makeSelectListAddress =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listAddressData')
);

const makeSelectListSubAddress =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listSubAddressData')
);

const makeSelectListUserPostData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listUserPostData')
);

const makeSelectListReviewsData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listReviewsData')
);

const makeSelectUserInfoData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userInfoData')
);

const makeSelectListPostSearchData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listPostSearchData')
);

const makeSelectCategoryData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('categoryData')
);

const makeSelectChildAddressData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('childAddressData')
);

const makeSelectParentAddressData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('parentAddressData')
);

const makeSelectTextSearchData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('textSearchData')
);

const makeSelectSortTypeData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('selectSortTypeData')
);

const makeSelectPostPriceData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('selectPostPriceData')
);

const makeSelectPostTypeData =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('selectPostTypeData')
);

const makeSelectPostType =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('postType')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocationState,
  makeSelectPostData,
  makeSelectListPostData,
  makeSelectCategoryId,
  makeSelectCategorySettingId,
  makeSelectTopPageSize,
  makeSelectCategorySearch,
  makeSelectSubCategorySearch,  
  makeSelectListCategory,
  makeSelectListSubCategory,
  makeSelectAddressSearch,
  makeSelectSubAddressSearch,
  makeSelectListAddress,
  makeSelectListSubAddress,
  makeSelectListUserPostData,
  makeSelectListReviewsData,
  makeSelectUserInfoData,
  makeSelectListPostSearchData,
  makeSelectCategoryData,
  makeSelectChildAddressData,
  makeSelectParentAddressData,
  makeSelectTextSearchData,
  makeSelectSortTypeData,
  makeSelectPostPriceData,
  makeSelectPostTypeData,
  makeSelectPostType
};
