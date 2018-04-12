/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {

  LOAD_POST,LOAD_POST_SUCCESS,LOAD_POST_ERROR,
  LOAD_LIST_POST,LOAD_LIST_POST_SUCCESS,LOAD_LIST_POST_ERROR,RESET_PARAM_LIST_POST,
  CLICK_TOP_CATEGORY,CLICK_VIEW_MORE_POST,CLICK_SWITCH_POST_TYPE,
  LOAD_LIST_ADDRESS, LOAD_LIST_ADDRESS_ERROR, LOAD_LIST_ADDRESS_SUCCESS,CLICK_ADDRESS_SEARCH,
  LOAD_LIST_SUBADDRESS, LOAD_LIST_SUBADDRESS_ERROR, LOAD_LIST_SUBADDRESS_SUCCESS,CLICK_SUBADDRESS_SEARCH,
  LOAD_LIST_CATEGORY, LOAD_LIST_CATEGORY_ERROR, LOAD_LIST_CATEGORY_SUCCESS,CLICK_CATEGORY_SEARCH,
  LOAD_LIST_SUBCATEGORY, LOAD_LIST_SUBCATEGORY_ERROR, LOAD_LIST_SUBCATEGORY_SUCCESS,CLICK_SUBCATEGORY_SEARCH,
  LOAD_LIST_USER_POST,LOAD_LIST_USER_POST_SUCCESS,LOAD_LIST_USER_POST_ERROR,
  LOAD_LIST_REVIEWS,LOAD_LIST_REVIEWS_SUCCESS,LOAD_LIST_REVIEWS_ERROR,
  LOAD_USER_INFO, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_ERROR,
  SEARCH_POST, SEARCH_POST_SUCCESS, SEARCH_POST_ERROR, INPUT_TEXT_SEARCH, RESET_OPTION_SEARCH, SELECT_SORT_TYPE_SEARCH, SELECT_POST_PRICE_SEARCH, SELECT_POST_TYPE_SEARCH
} from './constants';


// LOAD POST DETAIL

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_POST
 */
export function loadPost(postId) {
  return {
    type: LOAD_POST,
    postId,
  };
}

/**
 * 
 * @param {*} postData 
 */
export function postLoaded(postData) {
  return {
    type: LOAD_POST_SUCCESS,
    postData,
  };
}

export function postLoadingError(error) {
  return {
    type: LOAD_POST_ERROR,
    error,
  };
}

// LOAD LIST POST DATA
export function loadListPost(postType, cateStDefaultId) {
  return {
    type: LOAD_LIST_POST,
    postType,
    cateStDefaultId
  };
}

export function topPageLoaded(listPostData) {
  return {
    type: LOAD_LIST_POST_SUCCESS,
    listPostData,
  };
}

export function topPageLoadingError(error) {
  return {
    type: LOAD_LIST_POST_ERROR,
    error,
  };
}

// CHOOSE CATEGORY_ID
export function handleClickCategory(categoryId, categorySettingId, categoryType) {
  return {
    type: CLICK_TOP_CATEGORY,
    categoryId,
    categorySettingId,
    categoryType
  };
}

// CLICK VIEW MORE POST ON TOP PAGE
export function handleClickViewMore(topPageSize) {
  console.log("actions: click view more post" );
  return {
    type: CLICK_VIEW_MORE_POST,
    topPageSize
  };
}

// CLICK SWITCH POST TYPE ON TOP PAGE
export function handleClickSwitchPostType(postType) {
  return {
    type: CLICK_SWITCH_POST_TYPE,
    postType
  };
}

// LOAD LIST CATEGORY DATA
export function loadListCategory() {
  console.log("actions: loadListCategory" );
  return {
    type: LOAD_LIST_CATEGORY,
  };
}

export function listCategoryLoaded(listCategoryData) {
   console.log("actions: loadListCategory success" );
  return {
    type: LOAD_LIST_CATEGORY_SUCCESS,
    listCategoryData,
  };
}

export function listCategoryLoadingError(error) {
  return {
    type: LOAD_LIST_CATEGORY_ERROR,
    error,
  };
}

// LOAD LIST SUBCATEGORY DATA
export function loadListSubCategory(parentId) {
  return {
    type: LOAD_LIST_SUBCATEGORY,
    parentId
  };
}

export function listSubCategoryLoaded(listSubCategoryData) {
  return {
    type: LOAD_LIST_SUBCATEGORY_SUCCESS,
    listSubCategoryData,
  };
}

export function listSubCategoryLoadingError(error) {
  return {
    type: LOAD_LIST_SUBCATEGORY_ERROR,
    error,
  };
}

// CHOOSE CATEGORY ON SEARCH PAGE
export function handleClickCategorySearch(category) {
  return {
    type: CLICK_CATEGORY_SEARCH,
    category
  };
}

// CHOOSE SUBCATEGORY ON SEARCH PAGE
export function handleClickSubCategorySearch(category) {
  return {
    type: CLICK_SUBCATEGORY_SEARCH,
    category
  };
}

// LOAD LIST ADDRESS DATA
export function loadListAddress() {
  return {
    type: LOAD_LIST_ADDRESS,
  };
}

export function listAddressLoaded(listAddressData) {
  return {
    type: LOAD_LIST_ADDRESS_SUCCESS,
    listAddressData,
  };
}

export function listAddressLoadingError(error) {
  return {
    type: LOAD_LIST_ADDRESS_ERROR,
    error,
  };
}

// LOAD LIST SUBADDRESS DATA
export function loadListSubAddress(parentId) {
  return {
    type: LOAD_LIST_SUBADDRESS,
    parentId
  };
}

export function listSubAddressLoaded(listSubAddressData) {
  return {
    type: LOAD_LIST_SUBADDRESS_SUCCESS,
    listSubAddressData,
  };
}

export function listSubAddressLoadingError(error) {
  return {
    type: LOAD_LIST_SUBADDRESS_ERROR,
    error,
  };
}


// CHOOSE ADDRESS ON SEARCH PAGE
export function handleClickAdresssSearch(parentAddress) {
  return {
    type: CLICK_ADDRESS_SEARCH,
    parentAddress
  };
}

// CHOOSE SUBADDRESS ON SEARCH PAGE
export function handleClickSubAdresssSearch(childAddress) {
  return {
    type: CLICK_SUBADDRESS_SEARCH,
    childAddress
  };
}

// SEARCH POST
export function handleClickSearchPost(params) {
  var addrDistrictId = params.addrDistrictId
  var addrProvinceId = params.addrProvinceId
  var categoryIdSuper = params.categoryIdSuper
  var isSameCompany = params.isSameCompany
  var page = params.page
  var postType = params.postType
  var price = params.price
  var size = params.size
  var sortField = params.sortField
  var textSearch = params.textSearch
  var bannerId = params.bannerId
  
  return {
    type: SEARCH_POST,
    addrDistrictId,
    addrProvinceId,
    categoryIdSuper,
    isSameCompany,
    page,
    postType,
    price,
    size,
    sortField,
    textSearch,
    bannerId
  };
}


// SEARCH POST SUCCESS
export function handleSearchPostSuccsess(listPostSearchData) {
  return {
    type: SEARCH_POST_SUCCESS,
    listPostSearchData
  };
}


// SEARCH POST ERROR
export function handleSearchPostError(error) {
  return {
    type: SEARCH_POST_ERROR,
    error
  };
}


// LOAD LIST USER POST
export function loadListUserPost(userId, page, size) {
  return {
    type: LOAD_LIST_USER_POST,
    userId,
    page,
    size
  };
}

export function loadListUserPostSuccess(listUserPostData) {
  return {
    type: LOAD_LIST_USER_POST_SUCCESS,
    listUserPostData,
  };
}

export function loadListUserPostError(error) {
  return {
    type: LOAD_LIST_USER_POST_ERROR,
    error,
  };
}

// LOAD LIST REVIEWS
export function loadListReviews(userReviewRate, userId, page, size) {
  return {
    type: LOAD_LIST_REVIEWS,
    userId,
    page,
    size,
    userReviewRate
  };
}

export function loadListReviewsSuccess(listReviewsData) {
  return {
    type: LOAD_LIST_REVIEWS_SUCCESS,
    listReviewsData,
  };
}

export function loadListReviewsError(error) {
  return {
    type: LOAD_LIST_REVIEWS_ERROR,
    error,
  };
}

// LOAD USER INFO
export function loadUserInfo(userId) {
  return {
    type: LOAD_USER_INFO,
    userId,
  };
}

export function loadUserInfoSuccess(userInfoData) {
  return {
    type: LOAD_USER_INFO_SUCCESS,
    userInfoData,
  };
}

export function loadUserInfoError(error) {
  return {
    type: LOAD_USER_INFO_ERROR,
    error,
  };
}

export function resetOptionSearch() {
  return {
    type: RESET_OPTION_SEARCH
  };
}

export function inputTextSearch(textSearch) {
  return {
    type: INPUT_TEXT_SEARCH,
    textSearch
  };
}

export function resetParamListPost() {
  return {
    type: RESET_PARAM_LIST_POST,
  };
}

export function selectSortTypeSearch(sortType) {
  return {
    type: SELECT_SORT_TYPE_SEARCH,
    sortType: sortType
  };
}

export function selectPostPriceSearch(postPrice) {
  return {
    type: SELECT_POST_PRICE_SEARCH,
    postPrice: postPrice
  };
}

export function selectPostTypeSearch(postType) {
  return {
    type: SELECT_POST_TYPE_SEARCH,
    postType: postType
  };
}
