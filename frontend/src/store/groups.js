export const LOAD_GROUPS = "groups/LOAD_GROUPS"

export const findGroups = () => async dispatch => {
    const response = await fetch('api/groups');

    if (response.ok) {
        const groups = await response.json();
    }
};
