import { SHOW_MAPMARKER } from "../action/markerAction"

const initialState = {
    mapMarker:[]
}

const mapMarkerReducer = (state = initialState,action) => {
    // console.log('state mapmarker -->', state)
    // console.log('state mapmarker ii-->', action.data)
    switch(action.type){
        case SHOW_MAPMARKER:
        return {
            ...state,mapMarker:action.data
        }
        default:
            return state
    }
}

export default mapMarkerReducer