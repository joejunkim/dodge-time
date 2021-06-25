import { csrfFetch } from "./csrf";

export const JOIN_GROUP = "userGroups/JOIN_GROUP";

const joinOneGroup = (userGroup) => {
    type: JOIN_GROUP,
    userGroup;
}

export const addGroup = (groupData) => async dispatch => {
    const response = await csrfFetch('/api/events')

    if (response.ok) {
        const userGroup = await response.json();
        dispatch(joinOneGroup());
        return userGroup;
    }
}
