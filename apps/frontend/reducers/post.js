export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: "Joonie"
        },
        content: "first post, #hashtag #express",
        Images: [{
            src: "https://assets.vogue.in/photos/5ce44f44cc50be12c31421bd/4:3/w_600,h_450,c_limit/0058ac7f7ff3b62f1cfeb00aeb750a90.jpg"
        }, {
            src: "https://d32ydbgkw6ghe6.cloudfront.net/production/uploads/images/073ab730c300db43a7a815455fad9b9a531d/normal.jpg"
        }, {
            src: "https://media.makeameme.org/created/sleep-eat-code.jpg"
        }],
        Comments: [{
            User: {
                nickname: 'bongsoo',
            },
            content: 'geil junge'
        }, {
            User: {
                nickname: 'insun',
            },
            content: 'wtf'
        }]
    }],
    imagePaths: [],
    postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}
const dummyPost = {
    id: 2,
    content: "Das ist ein Dummy-Content",
    User: {
        id: 1,
        nickname: "Joonie"
    },
    Images: [],
    Comments: [],
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
}

export default reducer;