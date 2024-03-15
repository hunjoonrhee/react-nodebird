import { HYDRATE } from 'next-redux-wrapper';

import user from './user';
import post from './post';
import {combineReducers} from "redux";

// (previous, action) => next state
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                return { ...state, ...action.payload}

            default:
                return state;
        }
    },
    user,
    post
})

export default rootReducer;