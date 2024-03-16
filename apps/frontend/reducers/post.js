// eslint-disable-next-line import/no-extraneous-dependencies
import shortId from 'shortid';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from '../actions';

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'Joonie',
    },
    content: 'first post, #hashtag #express',
    Images: [{
      src: 'https://assets.vogue.in/photos/5ce44f44cc50be12c31421bd/4:3/w_600,h_450,c_limit/0058ac7f7ff3b62f1cfeb00aeb750a90.jpg',
    }, {
      src: 'https://d32ydbgkw6ghe6.cloudfront.net/production/uploads/images/073ab730c300db43a7a815455fad9b9a531d/normal.jpg',
    }, {
      src: 'https://media.makeameme.org/created/sleep-eat-code.jpg',
    }],
    Comments: [{
      User: {
        nickname: 'bongsoo',
      },
      content: 'geil junge',
    }, {
      User: {
        nickname: 'insun',
      },
      content: 'wtf',
    }],
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  ADD_COMMENT_REQUEST,
  data,
});
const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'Joonie',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 2,
    nickname: 'eunjoo',
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = state.mainPosts[postIndex];
      const Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
