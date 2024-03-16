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
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'joonie',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});
export const logoutRequestAction = () => ({
  type: LOG_IN_REQUEST,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: dummyUser(action.data),
        logInError: null,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        isLoggedOut: false,
        me: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedOut: true,

        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        signUpError: action.error,
      };
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changingNicknameLoading: true,
        changingNicknameDone: false,
        changingNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changingNicknameLoading: false,
        changingNicknameDone: true,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changingNicknameLoading: false,
        changingNicknameError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
