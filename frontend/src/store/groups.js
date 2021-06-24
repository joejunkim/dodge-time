import { csrfFetch } from "./csrf";

export const LOAD_GROUPS = "groups/LOAD_GROUPS"
export const ADD_GROUP = "groups/ADD_GROUP"
export const UPDATE_GROUP = "groups/UPDATE_GROUP"
export const DELETE_GROUP = "groups/DELETE_GROUP"

const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})

const addOneGroup = (group) => ({
    type: ADD_GROUP,
    group
})

const updateOneGroup = (group) => ({
    type: UPDATE_GROUP,
    group
})

const deleteOneGroup = (group) => ({
    type: DELETE_GROUP,
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

export const updateGroup = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'PUT'
    })

    if (response.ok) {
        const group = await response.json();
        dispatch(updateOneGroup(group));
    }
}

export const deleteGroup = (groupId) => async dispatch => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteOneGroup(groupId));
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
            return { ...newState }
        case DELETE_GROUP:
            delete state[action.group]
            return { ...state, }
        default:
            return state;
    }
};

export default groupsReducer;
