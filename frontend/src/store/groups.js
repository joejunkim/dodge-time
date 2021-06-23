import { csrfFetch } from "./csrf";

export const LOAD_GROUPS = "groups/LOAD_GROUPS"
export const ADD_GROUP = "groups/ADD_GROUP"

const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})

const addOneGroup = (group) => ({
    type: ADD_GROUP,
    group
})

export const getGroups = () => async dispatch => {
    const response = await csrfFetch('/api/groups');

    if (response.ok) {
        const groups = await response.json();
        dispatch(loadGroups(groups));
    }
};

export const addGroup = (newGroupData) => async dispatch => {
    const response = await csrfFetch('/api/groups',
        {
            method: 'POST',
            body: JSON.stringify(newGroupData)
        }
    )

    if (response.ok) {
        const group = await response.json();
        dispatch(addOneGroup(group))
        return group;
    }
}

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
        case ADD_GROUP:
            const newState = {
                ...state,
                [action.group.id]: action.group
            };
            console.log('---------->', newState)
            return {
                ...newState
            }
        default:
            return state;
    }
};

export default groupsReducer;
