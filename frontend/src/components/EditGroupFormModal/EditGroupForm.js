import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router";

function EditGroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await dispatch(deleteGroup(groupId))
        history.push(`/groups/${groupId}`)
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>FILLER TEXT</h1>
            <button type="submit">Edit Group</button>
        </form>
      );
}

export default EditGroupForm;
