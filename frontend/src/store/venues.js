import { csrfFetch } from "./csrf";

export const LOAD_VENUES = "groups/LOAD_VENUES"

const loadVenues = (venues) => ({
    type: LOAD_VENUES,
    venues
})

export const getVenues = () => async dispatch => {
    const response = await csrfFetch('/api/venues');

    if (response.ok) {
        const venues = await response.json();
        dispatch(loadVenues(venues));
    }
};


const initialState = {};

const venuesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_VENUES:
            const allVenues = {};
            action.venues.forEach((venue) => {
                allVenues[venue.id] = venue;
            })
            return {
                ...state,
                ...allVenues,
            }
        default:
            return state;
    }
};

export default venuesReducer;
