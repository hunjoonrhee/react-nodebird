import { produce } from 'immer';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
  FOLLOW_REQUEST,
  FOLLOW_FAILURE,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../actions';

export const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  logInError: null,
  isLoggingOut: false,
  isLoggedOut: false,
  logOutError: null,
  isSigningUp: false,
  isSignedUp: false,
  signUpError: null,
  changingNicknameLoading: false,
  changingNicknameDone: false,
  changingNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: false,
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'joonie',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'bongsoo' }, { nickname: 'insun' }, { nickname: 'eunjoo' }],
  Followers: [{ nickname: 'bongsoo' }, { nickname: 'insun' }, { nickname: 'eunjoo' }],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});
export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.isLoggingIn = true;
        draft.isLoggedIn = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.isLoggingIn = false;
        draft.isLoggedIn = true;
        draft.me = action.data;
        draft.logInError = null;
        break;
      case LOG_IN_FAILURE:
        draft.isLoggingIn = false;
        draft.isLoggedIn = false;
        draft.logInError = action.data;
        break;
      case LOG_OUT_REQUEST:
        draft.isLoggingOut = true;
        draft.isLoggedOut = false;
        draft.me = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.isLoggingOut = false;
        draft.isLoggedOut = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.isLoggingOut = false;
        draft.isLoggedOut = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.isSigningUp = true;
        draft.isSignedUp = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        break;
      case SIGN_UP_FAILURE:
        draft.isSigningUp = false;
        draft.signUpError = action.data;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changingNicknameLoading = true;
        draft.changingNicknameDone = false;
        draft.changingNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changingNicknameLoading = false;
        draft.changingNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changingNicknameLoading = false;
        draft.changingNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data });
        draft.followError = null;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followDone = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
        draft.unfollowError = null;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowDone = false;
        draft.unfollowError = action.error;
        break;
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = true;
        draft.me = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserDone = false;
        draft.loadUserError = action.error;
        break;
      default:
        return state;
    }
  });

export default reducer;
