import { csrfFetch } from "./csrf";

export const LOAD_EVENTS = "events/LOAD_EVENTS"

const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events
})

export const getEvents = () => async dispatch => {
    const response = await csrfFetch('/api/events');

    if (response.ok) {
        const events = await response.json();
        dispatch(loadEvents(events));
    }
};

const initialState = {};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENTS:
            const allEvents = {};
            action.events.forEach((event) => {
                allEvents[event.id] = event;
            })
            return {
                ...state,
                ...allEvents,
            }
        default:
            return state;
    }
};

export default eventsReducer;
