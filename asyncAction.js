const redux = require('redux');
const thunk = require('redux-thunk')
const axios = require('axios');


// create instances
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;



// action type
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_FAIL = 'GET_POSTS_FAIL';


// action creater Fn
const getPostRequest = () => {
    return {
        type: GET_POSTS,
    }
}

const getPostRequestSuccess = data => {
    return {
        type: GET_POSTS_SUCCESS,
        payload: data,
    }
}

const getPostRequestFailure = error => {
    return {
        type: GET_POSTS_FAIL,
        payload: error
    }
}
// middleware Fn: action creater fn that returns another action creater 
/* 
    this middleware fn will return a function, and it has DISPATCH available for it,
    due to register thunk as a middleware. 
*/
const fetchPosts = () => {
    return function (dispatch) {
        dispatch(getPostRequest());
        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                const posts = res.data.map(post => post.title)
                dispatch(getPostRequestSuccess(posts));
            })
            .catch(error => {
                dispatch(getPostRequestFailure(error))
            })
    }
}

// initial state
const initialState = {
    loading: false,
    posts: [],
    error: ''
}


// reducerFn
const reducerFn = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                loading: true
            }
        case GET_POSTS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case GET_POSTS_FAIL:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state;
    }
}


// implimentation of store
// const store = createStore(reducerFn,{ }, applyMiddleware(thunk));
const store = createStore(reducerFn, applyMiddleware(thunk));

// subscribe store
store.subscribe(() => console.log(store.getState()));


// dispatch action
store.dispatch(fetchPosts());


/* cons [user, setUser] = useState({
    user: {
        name:'tejas', 
        age:25,
    }
})

setState((ele)=> ) */