// global state -> action -> dispatch(action) -> reducerFun -> update the state


// imports
const redux = require('redux');
const createStore = redux.createStore;    // global store[state]


// define type ofactions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';


// action creator function: to add payload with actions
const increatmentCounter = () => {
    return {
        type: INCREMENT,

    }
}
const decreatmentCounter = () => {
    return {
        type: DECREMENT,

    }
}


// define initial state values
const initialState = {
    count: 0
}


// reducer function > [reducer function must be a pure] 
// reducer function is always listening the action, once action got dispatch it listen by reducer
// [since the store takes reducer function as a parameter(in create store method, it has access of all actions)]
const counterReducer = (state = initialState, action) => {
    console.warn('REDUCER-FN: ', action);
    switch (action.type) {
        case INCREMENT:
            return { count: state.count + 1 };
        case DECREMENT:
            return { count: state.count - 1 };
        default:
            return state;
    }
}


// create store method >>  pass reducerFn to the store
// store returns 3 methods > subscribe [adds change listener & also returns unsubscribe handler which unsubscribe listener], getState[get current state], dispatch[]
const store = createStore(counterReducer)

const unsubscribeFn = store.subscribe(() => console.log(store.getState()));


store.dispatch(increatmentCounter()) // count =1
store.dispatch(increatmentCounter()) // count =2
store.dispatch(increatmentCounter()) // count =3
store.dispatch(decreatmentCounter()) // count =2
store.dispatch(decreatmentCounter()) // count =1
store.dispatch(decreatmentCounter()) // count =0





