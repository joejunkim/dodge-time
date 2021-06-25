import { csrfFetch } from "./csrf";

export const LOAD_EVENTS = "events/LOAD_EVENTS"
export const ADD_EVENT = "events/ADD_EVENT"
export const UPDATE_EVENT = "events/UPDATE_EVENT"
export const DELETE_EVENT = "events/DELETE_EVENT"

const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events
})

const addOneEvent = (event) => ({
    type: ADD_EVENT,
    event
})

const updateOneEvent = (event) => ({
    type: UPDATE_EVENT,
    event
})

const deleteOneEvent = (event) => ({
    type: DELETE_EVENT,
    event
})

export const getEvents = () => async dispatch => {
    const response = await csrfFetch('/api/events');

    if (response.ok) {
        const events = await response.json();
        dispatch(loadEvents(events));
    }
};

export const addEvent = (eventData) => async dispatch => {
    const response = await csrfFetch('/api/events',
        {
            method: 'POST',
            body: JSON.stringify(eventData)
        }
    )

    if (response.ok) {
        const event = await response.json();
        dispatch(addOneEvent(event))
        return event;
    }
}

export const updateEvent = (eventData, eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(eventData)
        })

    if (response.ok) {
        const event = await response.json();
        dispatch(updateOneEvent(event));
    }
}

export const deleteEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, { method: 'DELETE' });

    if (response.ok) {
        dispatch(deleteOneEvent(eventId));
    }
}

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
        case UPDATE_EVENT:
            return {
                ...state,
                [action.event.id]: action.event,
            };
        case DELETE_EVENT:
            delete state[action.event]
            return { ...state }
        default:
            return state;
    }
};

export default eventsReducer;
