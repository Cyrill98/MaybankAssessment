import { SHOW_AUTOCOMPLETE } from "../action/autoCompleteAction"

const initialState = {
    autocomplete:[]
}

const AutocompleteReducer = (state = initialState,action) => {
    switch(action.type){
        case SHOW_AUTOCOMPLETE:
            return {
                ...state,autocomplete:action.data
            }
        default:
            return state
    }
}

export default AutocompleteReducer