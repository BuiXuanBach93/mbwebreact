/*
 * HomeReducer
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
  CHANGE_POSTID,
} from './constants';

// The initial state of the App
const initialState = fromJS({

});

function PostDetailReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_POSTID:

      // Delete prefixed '@' from the github username
      return state
        .set('postId', action.name.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default PostDetailReducer;
