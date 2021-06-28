import { csrfFetch } from "./csrf";

export const LOAD_USERS = "users/LOAD_USERS"

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

export const getUsers = () => async dispatch => {
    const response = await csrfFetch('/api/users');

    if (response.ok) {
        const users = await response.json();
        dispatch(loadUsers(users));
    }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:
            const allUsers = {};
            action.users.forEach((user) => {
                allUsers[user.id] = user;
            })
            return {
                ...state,
                ...allUsers,
            }
        default:
            return state;
    }
};

export default usersReducer;
