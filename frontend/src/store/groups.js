import { csrfFetch } from "./csrf";

export const LOAD_GROUPS = "groups/LOAD_GROUPS"
// export const GET_GROUP = "groups/GET_GROUP"
export const ADD_GROUP = "groups/ADD_GROUP"

const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
})

// const getGroup = (group) => ({
//     type: GET_GROUP,
//     group
// })

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

// export const getGroupDetails = (groupId) => async dispatch => {
//     const response = await csrfFetch(`/api/groups/${groupId}`);

//     if (response.ok) {
//         const group = await response.json();
//         dispatch(getGroup(group));
//     }
// }

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
        // case GET_GROUP:
        //     return {
        //         ...state
        //     }

        case ADD_GROUP:
            const newState = {
                ...state,
                [action.group.id]: action.group
            };
            console.log('---------->', newState)
            return { ...newState }
        default:
            return state;
    }
};

export default groupsReducer;
