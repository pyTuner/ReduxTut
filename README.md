<h1>Redux</h1>
<h4>Flow of the redux store</h4>
 <h6>global state -> action -> dispatch(action) -> ÏreducerFun -> update the state</h6>
 Store: central bucket which stores all the states of an application

  <h4>Actions</h4>
  actions are defined in store, which later listen by reducers  
  
  <h4>Reducer</h4>
  reducer function > [reducer function must be a pure function] 
  reducer function is always listening the action, once action got dispatch it listen by reducer
  [since the store takes reducer function as a parameter(in create store method, it has access of all actions)]

  <h4>Store</h4>
  create store method >>  pass reducerFn to the store
  store returns 3 methods > subscribe [adds change listener & also returns unsubscribe handler which unsubscribe listener], 
                            getState[get current state],   
                            dispatch[which dispatches the actions, to modify the state in store]

<h1>Middleware</h1>

<h4>normal flow of redux</h4>
 <h6>action ->  dispatch(action) -> reducers -> update state in store</h6>
 1. actions are defined in store -> 
 2. which are dispatches(actions) on event caused by UI ->
 3. reducers listen these actions and compare with initial state and make update accordingly in store


 <h4>with middleware</h4>
 <h6>action -> dispatch(action) -> middleware -> reducer -> update state </h6>
 here, after dispatching the 'action', it will go to the middleware before listening by reducers


when we perform async operation (such as API calls), we need to register an middleware in redux store,
So when the action gets trigger, before going to reducerFn (reducers), it will go through the middleware


two popular middleware libraries
    1. thunk
    2. saga
