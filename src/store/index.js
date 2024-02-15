import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import MyLocationReducer from './locationReducer'

const rootReducer = combineReducers({
    location: MyLocationReducer
})

export const rootStore = createStore(rootReducer, applyMiddleware(thunk))