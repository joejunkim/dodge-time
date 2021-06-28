import { csrfFetch } from "./csrf";

export const LOAD_RSVPS = "rsvps/LOAD_RSVPS"
export const RSVP_YES = "rsvps/RSVP_YES";
export const RSVP_NO = "rsvps/RSVP_NO"

const loadRSVPS = (rsvps) => ({
    type: LOAD_RSVPS,
    rsvps
})

const yesRSVP = (rsvp) => ({
    type: RSVP_YES,
    rsvp
})

const noRSVP = (rsvp) => ({
    type: RSVP_NO,
    rsvp
})

export const getRSVPS = (myId) => async dispatch => {
    const response = await csrfFetch(`/api/rsvps/${myId}`)

    if (response.ok) {
        const rsvps = await response.json()
        await dispatch(loadRSVPS(rsvps))
        return rsvps
    }
}

export const acceptEvent = (eventData) => async dispatch => {
    const response = await csrfFetch('/api/rsvps', {
        method: 'POST',
        body: JSON.stringify(eventData)
    })

    if (response.ok) {
        const rsvp = await response.json();
        dispatch(yesRSVP(rsvp));
        return rsvp;
    }
}

export const declineEvent = (userId, eventId) => async dispatch => {
    const response = await csrfFetch(`/api/rsvps`,
        {
            method: 'DELETE',
            body: JSON.stringify({ userId, eventId })
        });

    if (response.ok) {
        dispatch(noRSVP())
    }
}

const initialState= {}

const rsvpReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_RSVPS:
            const allRSVPS = {...state};
            action.rsvps.forEach((rsvp) => {
                allRSVPS[rsvp.id] = rsvp;
            })
            return allRSVPS
        case RSVP_YES:
            const newState = {
                ...state,
                [action.rsvp.id]: action.rsvp
            };
            return { ...newState }
        case RSVP_NO:
            delete state[action.rsvp]
            return { ...state }
        default:
            return state;
    }
};

export default rsvpReducer;
