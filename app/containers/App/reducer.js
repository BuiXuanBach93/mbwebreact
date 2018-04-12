/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {

  LOAD_REPOS_SUCCESS,LOAD_REPOS,LOAD_REPOS_ERROR,
  LOAD_LIST_POST,LOAD_LIST_POST_SUCCESS,LOAD_LIST_POST_ERROR,RESET_PARAM_LIST_POST,
  LOAD_POST,LOAD_POST_SUCCESS,LOAD_POST_ERROR,
  CLICK_TOP_CATEGORY,CLICK_VIEW_MORE_POST,CLICK_SWITCH_POST_TYPE,
  LOAD_LIST_CATEGORY,LOAD_LIST_CATEGORY_ERROR,LOAD_LIST_CATEGORY_SUCCESS,CLICK_CATEGORY_SEARCH,
  LOAD_LIST_SUBCATEGORY,LOAD_LIST_SUBCATEGORY_ERROR,LOAD_LIST_SUBCATEGORY_SUCCESS,CLICK_SUBADDRESS_SEARCH,
  LOAD_LIST_ADDRESS,LOAD_LIST_ADDRESS_ERROR, LOAD_LIST_ADDRESS_SUCCESS,CLICK_ADDRESS_SEARCH,
  LOAD_LIST_SUBADDRESS,LOAD_LIST_SUBADDRESS_ERROR, LOAD_LIST_SUBADDRESS_SUCCESS,
  LOAD_LIST_USER_POST,LOAD_LIST_USER_POST_SUCCESS,LOAD_LIST_USER_POST_ERROR,
  LOAD_LIST_REVIEWS,LOAD_LIST_REVIEWS_SUCCESS,LOAD_LIST_REVIEWS_ERROR,
  LOAD_USER_INFO, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_ERROR,
  SEARCH_POST, SEARCH_POST_SUCCESS, SEARCH_POST_ERROR,
  RESET_OPTION_SEARCH, INPUT_TEXT_SEARCH, SELECT_SORT_TYPE_SEARCH, SELECT_POST_PRICE_SEARCH, SELECT_POST_TYPE_SEARCH

} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
});

function appReducer(state = initialState, action) {
  console.log("reducer: ====", action.type);
  switch (action.type) {
    case LOAD_LIST_POST:
    case LOAD_POST:
    case LOAD_LIST_ADDRESS: 
    case LOAD_LIST_CATEGORY: 
    case LOAD_LIST_SUBCATEGORY:
    case LOAD_LIST_USER_POST:
    case LOAD_LIST_REVIEWS: 
    case LOAD_USER_INFO:
    case SEARCH_POST:
      return state
        .set('loading', true)
        .set('error', false)
    case LOAD_POST_SUCCESS:
      return state
        .set('postData', action.postData)
        .set('loading', false)
    case LOAD_LIST_POST_SUCCESS:
      return state
        .set('listPostData', action.listPostData)
        .set('loading', false)   
    case LOAD_LIST_CATEGORY_SUCCESS:
      return state
        .set('listCategoryData', action.listCategoryData)
        .set('loading', false)    
    case LOAD_LIST_SUBCATEGORY_SUCCESS:
      return state
        .set('listSubCategoryData', action.listSubCategoryData)
        .set('loading', false)        
    case LOAD_LIST_ADDRESS_SUCCESS:
      return state
        .set('listAddressData', action.listAddressData)
        .set('loading', false)      
    case LOAD_LIST_SUBADDRESS_SUCCESS:
      return state
        .set('listSubAddressData', action.listSubAddressData)
        .set('loading', false)                         
    case LOAD_REPOS_ERROR:
    case LOAD_LIST_POST_ERROR:
    case LOAD_POST_ERROR:
    case LOAD_LIST_ADDRESS_ERROR:
    case LOAD_LIST_SUBADDRESS_ERROR:
    case LOAD_LIST_CATEGORY_ERROR:
    case LOAD_LIST_SUBCATEGORY_ERROR:
    case LOAD_LIST_REVIEWS_ERROR:
    case LOAD_USER_INFO_ERROR:
    case SEARCH_POST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_LIST_USER_POST_SUCCESS:
      return state
        .set('listUserPostData', action.listUserPostData)
        .set('loading', false) 
    case LOAD_LIST_REVIEWS_SUCCESS:
      return state
        .set('listReviewsData', action.listReviewsData)
        .set('loading', false) 
    case LOAD_USER_INFO_SUCCESS:
      return state
        .set('userInfoData', action.userInfoData)
        .set('loading', false)                
    case CLICK_TOP_CATEGORY:
      return state
        .set('categoryId', action.categoryId)
        .set('categorySettingId', action.categorySettingId)
        .set('categoryType', action.categoryType)
        .set('loading', false)
    case CLICK_VIEW_MORE_POST:
      return state
        .set('topPageSize', action.topPageSize)
        .set('loading', false)
    case CLICK_SWITCH_POST_TYPE:
        return state
          .set('postType', action.postType)
    case SEARCH_POST_SUCCESS:
      return state
        .set('listPostSearchData', action.listPostSearchData)
        .set('loading', false)
    case CLICK_CATEGORY_SEARCH:
        return state
        .set('categoryData', action.category)
        .set('loading', false)
    case CLICK_ADDRESS_SEARCH:
        return state
          .set('parentAddressData', action.parentAddress)
          .set('loading', false)
    case CLICK_SUBADDRESS_SEARCH:
        return state
          .set('childAddressData', action.childAddress)
          .set('loading', false)    
    case RESET_OPTION_SEARCH:
        return state
            .set('childAddressData', null)
            .set('parentAddressData', null)    
            .set('categoryData', null)  
            .set('textSearchData', null)
            .set('selectSortTypeData', null)
            .set('selectPostPriceData', null)
            .set('selectPostTypeData', null)
    case INPUT_TEXT_SEARCH:
        return state
            .set('textSearchData', action.textSearch)
    case RESET_PARAM_LIST_POST:
        return state
          .set('categoryId', null)  
          .set('topPageSize', null)   
          .set('listPostData', null)
    case SELECT_SORT_TYPE_SEARCH:
       return state
          .set('selectSortTypeData', action.sortType)
    case SELECT_POST_PRICE_SEARCH:
        return state
          .set('selectPostPriceData', action.postPrice)  
    case SELECT_POST_TYPE_SEARCH:
      return state
        .set('selectPostTypeData', action.postType)   
    default:
      return state;
  }
}

export default appReducer;
