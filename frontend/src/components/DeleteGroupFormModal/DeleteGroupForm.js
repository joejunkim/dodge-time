import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router";

import { deleteGroup } from "../../store/groups";

function DeleteGroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteGroup(groupId))
        history.push('/groups')
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Are you sure you want to delete this group?</h1>
            <button type="submit">Delete Group</button>
        </form>
      );
}

export default DeleteGroupForm;
