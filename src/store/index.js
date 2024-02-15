import { createStore, applyMiddleware, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import MyLocationReducer from './reducer/locationReducer';
import mapMarkerReducer from './reducer/markerReducer';
import AutocompleteReducer from './reducer/autoCompleteReducer';

const rootReducer = combineReducers({
    location: MyLocationReducer,    
    marker: mapMarkerReducer,
    autoComplete: AutocompleteReducer

})

export default rootStore = createStore(rootReducer, applyMiddleware(thunk))