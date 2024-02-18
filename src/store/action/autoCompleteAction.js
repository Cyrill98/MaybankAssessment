export const SHOW_AUTOCOMPLETE = 'SHOW_AUTOCOMPLETE'

export const fetchAutocomplete = (coordinate) => {
    return async (dispatch, getState) => {
        const prevLocation = getState().autoComplete;
        const updateLocation = [...prevLocation.autocomplete, coordinate ]

        dispatch({
            type:SHOW_AUTOCOMPLETE,
            data: updateLocation
        })
    }
}