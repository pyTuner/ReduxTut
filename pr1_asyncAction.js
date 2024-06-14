const redux = require('redux');
const thunk = require('redux-thunk').thunk;
const axios = require('axios');



// handles
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// initial data state
const initialState = {
    loading: false,
    data: [],
    error: '',
}

// actions
const GETREQUEST = 'GETREQUEST';
const GETREQUESTSUCCESS = 'GETREQUESTSUCCESS';
const GETREQUESTERROR = 'GETREQUESTERROR';

// action creator fn
const getRequest = () => {
    return {
        type: GETREQUEST
    }
}

const getRequestSuccess = data => {
    return {
        type: GETREQUESTSUCCESS,
        payload: data,
    }
}

const getRequestError = error => {
    return {
        type: GETREQUESTERROR,
        payload: error,
    }
}


// middleware (action creator fn)
const getRequestMethod = () => {
    return function (dispatch) {
        dispatch(getRequest);
        axios
            .get('http://dummyjson.com/users')
            .then(res => {
                const users = res.data.users.map(user => (
                    {
                        fname: user.firstName,
                        lname: user.lastName
                    }
                ))
                dispatch(getRequestSuccess(users))
            })
            .catch(error => {
                dispatch(getRequestError(error.message))
            })
    }
}

// reducer fn
const reducerFn = (state = initialState, action) => {
    switch (action.type) {
        case GETREQUEST: return {
            ...state,
            loading: true,
        }
        case GETREQUESTSUCCESS: return {
            loading: false,
            data: action.payload,
            error: '',
        }
        case GETREQUESTERROR: return {
            loading: false,
            data: [],
            error: action.payload
        }
    }
}


// store mechanism
const store = createStore(reducerFn, applyMiddleware(thunk));

// listener
store.subscribe(() => console.log(store.getState()));

// dispatch
store.dispatch(getRequestMethod());