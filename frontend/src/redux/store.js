import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { saveToLocalStorage, loadFromLocalStorage } from "./persist"
import rootSaga from './sagas'
import rootReducer, { DEFAULT_STATE } from './reducers'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage()
const loadupState = persistedState ? persistedState : DEFAULT_STATE

const store = createStore(
  rootReducer,
  loadupState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

store.subscribe(() => saveToLocalStorage(store.getState()))
sagaMiddleware.run(rootSaga)


export default store;
