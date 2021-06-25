import { csrfFetch } from "./csrf";

export const LOAD_USERGROUPS = "userGroups/LOAD_USERGROUPS"
export const JOIN_GROUP = "userGroups/JOIN_GROUP";
export const LEAVE_GROUP = "userGroups/LEAVE_GROUP"

const loadUserGroups = (userGroups) => ({
    type: LOAD_USERGROUPS,
    userGroups
})

const joinOneGroup = (userGroup) => ({
    type: JOIN_GROUP,
    userGroup
})

const leaveOneGroup = (userGroup) => ({
    type: LEAVE_GROUP,
    userGroup
})

export const getUserGroups = () => async dispatch => {
    const response = await csrfFetch('/api/userGroups')

    if (response.ok) {
        const userGroups = await response.json()
        dispatch(loadUserGroups(userGroups))
    }
}

export const joinGroup = (groupData) => async dispatch => {
    const response = await csrfFetch('/api/userGroups', {
        method: 'POST',
        body: JSON.stringify(groupData)
    })

    if (response.ok) {
        const userGroup = await response.json();
        dispatch(joinOneGroup(userGroup));
        return userGroup;
    }
}

export const leaveGroup = (userId, groupId) => async dispatch => {
    const response = await csrfFetch(`/api/userGroups`,
        {
            method: 'DELETE',
            body: JSON.stringify({ userId, groupId })
        });

    if (response.ok) {
        dispatch(leaveOneGroup())
    }
}

const initialState= {}

const userGroupsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_USERGROUPS:
            const allUserGroups = {};
            action.userGroups.forEach((group) => {
                allUserGroups[group.id] = group;
            })
            return {
                ...state,
                ...allUserGroups,
            }
        case JOIN_GROUP:
            const newState = {
                ...state,
                [action.userGroup.id]: action.userGroup
            };
            return { ...newState }
        case LEAVE_GROUP:
            delete state[action.userGroup]
            return { ...state }
        default:
            return state;
    }
};

export default userGroupsReducer;
