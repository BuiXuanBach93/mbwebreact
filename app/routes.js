// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import {BASE_PREFIX} from './containers/App/constants' 

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: BASE_PREFIX + '/sp',
      name: 'top-page',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TopPage/reducer'),
          import('containers/TopPage/sagas'),
          import('containers/TopPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('top-page', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX +'/sp/post-detail/:postId',
      name: 'post-detail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PostDetail/reducer'),
          import('containers/PostDetail/sagas'),
          import('containers/PostDetail'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('post-detail', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX + '/sp/search-post',
      name: 'search-post',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchPost/reducer'),
          import('containers/SearchPost/sagas'),
          import('containers/SearchPost'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search-post', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX + '/sp/search-category',
      name: 'search-category',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchCategory/reducer'),
          import('containers/SearchCategory/sagas'),
          import('containers/SearchCategory'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search-category', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX + '/sp/search-subcategory/:parentId',
      name: 'search-subcategory',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchSubCategory/reducer'),
          import('containers/SearchSubCategory/sagas'),
          import('containers/SearchSubCategory'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search-subcategory', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

    {
      path:  BASE_PREFIX + '/sp/search-address',
      name: 'search-address',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchAddress/reducer'),
          import('containers/SearchAddress/sagas'),
          import('containers/SearchAddress'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search-address', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX + '/sp/search-subaddress/:parentId',
      name: 'search-subaddress',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchSubAddress/reducer'),
          import('containers/SearchSubAddress/sagas'),
          import('containers/SearchSubAddress'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search-subaddress', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX +'/sp/search-results',
      name: 'search-results',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchPost/reducer'),
          import('containers/SearchPost/sagas'),
          import('containers/SearchResults'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search-results', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }
    , {
      path:  BASE_PREFIX + '/sp/user-profile/:userId',
      name: 'user-profile',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/UserProfile/reducer'),
          import('containers/UserProfile/sagas'),
          import('containers/UserProfile'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('user-profile', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    
    {
      path:  BASE_PREFIX + '/sp/reviews/:userId',
      name: 'reviews',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ListReview/reducer'),
          import('containers/ListReview/sagas'),
          import('containers/ListReview'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('reviews', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX + '/sp/app',
      name: 'app',
      getComponent(nextState, cb) {
        import('containers/OpenApp')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX + '/sp/photo/:postId',
      name: 'photo',
      getComponent(nextState, cb) {
        import('containers/Photo')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path:  BASE_PREFIX +'/sp/list-posts',
      name: 'search-hashtag',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchPost/reducer'),
          import('containers/SearchPost/sagas'),
          import('containers/SearchHashTag'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('search-hashtag', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
 ];
}
