import { csrfFetch } from "./csrf";

export const LOAD_GROUPS = "groups/LOAD_GROUPS"

const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})

export const getGroups = () => async dispatch => {
    const response = await csrfFetch('/api/groups');

    if (response.ok) {
        const groups = await response.json();
        dispatch(loadGroups(groups));
    }
};

const initialState = {};

const groupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS:
            const allGroups = {};
            action.groups.forEach((group) => {
                allGroups[group.id] = group;
            })
            return {
                ...state,
                ...allGroups,
            }
        default:
            return state;
    }
};

export default groupsReducer;
