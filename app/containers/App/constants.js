/*
 * AppConstants

 */

 /* DIFINE ACTION TYPE CONSTANT 
  * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
  */
export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';

export const LOAD_POST= 'boilerplate/PostDetail/LOAD_POST';
export const LOAD_POST_SUCCESS = 'boilerplate/PostDetail/LOAD_POST_SUCCESS';
export const LOAD_POST_ERROR = 'boilerplate/PostDetail/LOAD_POST_ERROR';

export const LOAD_LIST_POST= 'boilerplate/TopPage/LOAD_LIST_POST';
export const LOAD_LIST_POST_SUCCESS = 'boilerplate/TopPage/LOAD_LIST_POST_SUCCESS';
export const LOAD_LIST_POST_ERROR = 'boilerplate/TopPage/LOAD_LIST_POST_ERROR';
export const RESET_PARAM_LIST_POST = 'boilerplate/TopPage/RESET_PARAM_LIST_POST';

export const CLICK_TOP_CATEGORY = 'boilerplate/TopPage/CLICK_TOP_CATEGORY';
export const CLICK_VIEW_MORE_POST = 'boilerplate/TopPage/CLICK_VIEW_MORE_POST';
export const CLICK_SWITCH_POST_TYPE = 'boilerplate/TopPage/CLICK_SWITCH_POST_TYPE';

export const LOAD_LIST_CATEGORY= 'boilerplate/SearchCategory/LOAD_LIST_CATEGORY';
export const LOAD_LIST_CATEGORY_SUCCESS = 'boilerplate/SearchCategory/LOAD_LIST_CATEGORY_SUCCESS';
export const LOAD_LIST_CATEGORY_ERROR = 'boilerplate/SearchCategory/LOAD_LIST_CATEGORY_ERROR';
export const CLICK_CATEGORY_SEARCH = 'boilerplate/SearchCategory/CLICK_CATEGORY_SEARCH';

export const LOAD_LIST_SUBCATEGORY= 'boilerplate/SearchSubCategory/LOAD_LIST_SUBCATEGORY';
export const LOAD_LIST_SUBCATEGORY_SUCCESS = 'boilerplate/SearchSubCategory/LOAD_LIST_SUBCATEGORY_SUCCESS';
export const LOAD_LIST_SUBCATEGORY_ERROR = 'boilerplate/SearchSubCategory/LOAD_LIST_SUBCATEGORY_ERROR';
export const CLICK_SUBCATEGORY_SEARCH = 'boilerplate/SearchSubCategory/CLICK_SUBCATEGORY_SEARCH';

export const LOAD_LIST_ADDRESS= 'boilerplate/SearchAddress/LOAD_LIST_ADDRESS';
export const LOAD_LIST_ADDRESS_SUCCESS = 'boilerplate/SearchAddress/LOAD_LIST_ADDRESS_SUCCESS';
export const LOAD_LIST_ADDRESS_ERROR = 'boilerplate/SearchAddress/LOAD_LIST_ADDRESS_ERROR';
export const CLICK_ADDRESS_SEARCH = 'boilerplate/SearchAddress/CLICK_ADDRESS_SEARCH';

export const LOAD_LIST_SUBADDRESS= 'boilerplate/SearchSUBAddress/LOAD_LIST_SUBADDRESS';
export const LOAD_LIST_SUBADDRESS_SUCCESS = 'boilerplate/SearchSUBAddress/LOAD_LIST_SUBADDRESS_SUCCESS';
export const LOAD_LIST_SUBADDRESS_ERROR = 'boilerplate/SearchSUBAddress/LOAD_LIST_SUBADDRESS_ERROR';
export const CLICK_SUBADDRESS_SEARCH = 'boilerplate/SearchSUBAddress/CLICK_SUBADDRESS_SEARCH';

export const LOAD_LIST_USER_POST= 'boilerplate/UserProfile/LOAD_LIST_USER_POST';
export const LOAD_LIST_USER_POST_SUCCESS = 'boilerplate/UserProfile/LOAD_LIST_USER_POST_SUCCESS';
export const LOAD_LIST_USER_POST_ERROR = 'boilerplate/UserProfile/LOAD_LIST_USER_POST_ERROR';

export const LOAD_LIST_REVIEWS = 'boilerplate/UserProfile/LOAD_LIST_REVIEWS';
export const LOAD_LIST_REVIEWS_SUCCESS = 'boilerplate/UserProfile/LOAD_LIST_REVIEWS_SUCCESS';
export const LOAD_LIST_REVIEWS_ERROR = 'boilerplate/UserProfile/LOAD_LIST_REVIEWS_ERROR';

export const LOAD_USER_INFO = 'boilerplate/UserProfile/LOAD_USER_INFO';
export const LOAD_USER_INFO_SUCCESS = 'boilerplate/UserProfile/LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_ERROR = 'boilerplate/UserProfile/LOAD_USER_INFO_ERROR';

export const SEARCH_POST = 'boilerplate/SearchResults/SEARCH_POST';
export const SEARCH_POST_SUCCESS = 'boilerplate/SearchResults/SEARCH_POST_SUCCESS';
export const SEARCH_POST_ERROR = 'boilerplate/SearchResults/SEARCH_POST_ERROR';

export const RESET_OPTION_SEARCH = 'boilerplate/SearchPost/RESET_OPTION_SEARCH';
export const INPUT_TEXT_SEARCH = 'boilerplate/SearchPost/INPUT_TEXT_SEARCH';
export const SELECT_SORT_TYPE_SEARCH = 'boilerplate/SearchPost/SELECT_SORT_TYPE_SEARCH';
export const SELECT_POST_PRICE_SEARCH = 'boilerplate/SearchPost/SELECT_POST_PRICE_SEARCH';
export const SELECT_POST_TYPE_SEARCH = 'boilerplate/SearchPost/SELECT_POST_TYPE_SEARCH';


/* DIFINE API URL 
  * export const YOUR_API = 'URL';
  */
const api_url=function(){
    let api_url='';
    if(process.env.BASE_URL == 'local'){
      api_url= 'http://localhost:8080/bocc/api/v1/';
    }
    else if(process.env.BASE_URL == 'dev'){
      api_url= 'http://bocc.dev.hblab.vn/api/v1/';
    }
    else if(process.env.BASE_URL == 'test'){
      api_url = 'http://bocc.test.hblab.vn/api/v1/';
    }
    else if(process.env.BASE_URL == 'staging'){
      api_url = 'http://bocc.stg.hblab.vn/api/v1/';
    }
    else if(process.env.BASE_URL == 'botest'){
      api_url = 'https://testbs.benefit-test.jp/bocctest/api/v1/';
    }
    else if(process.env.BASE_URL == 'prod'){
      api_url = 'https://workers-market.com/api/v1/';
    }
    return api_url;
}
export const BASE_URL= api_url();

const maintain_url=function(){
  let maintain_url='';
  if(process.env.BASE_URL == 'local'){
    maintain_url= 'https://s3-ap-northeast-1.amazonaws.com/boccstatic/static/html/maintenance.html';
  }
  else if(process.env.BASE_URL == 'dev'){
    maintain_url= 'https://s3-ap-northeast-1.amazonaws.com/boccstatic/static/html/maintenance.html';
  }
  else if(process.env.BASE_URL == 'test'){
    maintain_url = 'https://s3-ap-northeast-1.amazonaws.com/boccstatic/static/html/maintenance/sp/botest/maintenance.html';
  }
  else if(process.env.BASE_URL == 'staging'){
    maintain_url = 'https://s3-ap-northeast-1.amazonaws.com/boccstatic/static/html/maintenance/sp/staging/maintenance.html';
  }
  else if(process.env.BASE_URL == 'botest'){
    maintain_url = 'https://s3-ap-northeast-1.amazonaws.com/boccstatic/static/html/maintenance/sp/botest/maintenance.html';
  }
  else if(process.env.BASE_URL == 'prod'){
    maintain_url = 'https://s3-ap-northeast-1.amazonaws.com/boccstatic/static/html/maintenance/sp/prod/maintenance.html';
  }
  return maintain_url;
}
export const MAINTAIN_URL= maintain_url();

const prefix = function(){
  let prefix='';
  if(process.env.BASE_URL == 'local'){
    prefix= '';
  }
  else if(process.env.BASE_URL == 'dev'){
    prefix= '';
  }
  else if(process.env.BASE_URL == 'test'){
    prefix = '';
  }
  else if(process.env.BASE_URL == 'staging'){
    prefix = '';
  }
  else if(process.env.BASE_URL == 'botest'){
    prefix = '/bocctest';
  }
  else if(process.env.BASE_URL == 'prod'){
    prefix = '';
  }
  return prefix;
}
export const BASE_PREFIX = prefix();


export const API_SEARCH_POST = BASE_URL + 'webmobile/posts';
export const API_LOAD_POST = BASE_URL + 'webmobile/posts?page=0';
export const API_GET_CATEGORIES_INCLUDE_ALL = BASE_URL + 'categories?isAllIncluded=true';
export const API_GET_CATEGORIES = BASE_URL + 'categories';
export const API_GET_CATEGORY_SETTING = BASE_URL + 'category-setting-no-login';
export const API_GET_ADDRESS_INCLUDE_ALL = BASE_URL + 'addresses?isAllIncluded=true';
export const API_GET_ADDRESS = BASE_URL + 'addresses';
export const API_GET_POST_DETAIL = BASE_URL + 'webmobile/posts/';
export const API_GET_LIST_USER_POST = BASE_URL + 'webmobile/posts/get-by-user';
export const API_GET_LIST_REVIEWS = BASE_URL + 'webmobile/user/list-reviews';
export const API_GET_USER_INFO = BASE_URL + 'webmobile/users/userpage/';
export const API_GET_BANNER_DATA = BASE_URL + 'banners';
export const API_CHECK_MAINTAIN_MODE = BASE_URL + 'addresses';

/* DEFINE LINK*/
export const LINK_APP_STORE_IOS = 'itms://itunes.apple.com/jp/app/id1246015521'
export const LINK_APP_STORE_ANDROID = 'https://itunes.apple.com/jp/app/id1246015521'
export const LINK_GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=jp.co.benefitone.bocc'
export const LINK_USER_GUIDE = 'https://workers-market.com/info/html/guide.html'
export const LINK_FAQ = 'https://workers-market.com/info/html/faq.html'
export const FORBIDDEN_ITEM = 'https://workers-market.com/info/html/prohibit.html'
export const TERM_OF_USE = 'https://workers-market.com/info/html/terms.html'
export const PRIVACY_POLICY = 'https://bs.benefit-one.co.jp/BE-ONE/official/privacy.html  '
export const PERSONAL_INFORMATION = 'https://bs.benefit-one.co.jp/BE-ONE/index.html'
/*LINK SCHEMA*/
export const LINK_SCHEMA = 'boccwm://bocc.com/activation?token=';

export const BANNER_TYPE ={
  WEB: 'WEB', 
  CATEGORY: 'CATEGORY', 
  KEYWORD: 'KEYWORD', 
  POST_ID: 'POST_ID'
}
