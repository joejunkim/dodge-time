import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router";

import { updateGroup } from '../../store/groups'

function EditGroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    const groups = useSelector((state) => Object.values(state.groups))
    const group = useSelector((state) => (state.groups[groupId]))

    const [name, setName] = useState(group.name);
    const [type, setType] = useState(group.type);
    const [description, setDescription] = useState(group.description)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await dispatch(updateGroup(groupId))
        history.push(`/groups/${groupId}`)
    };

    useEffect(() => {
        const errors = [];
        if (name.length > 20) {
            errors.push("Name must be 20 characters or less")
        } else if (groups.map(group => group.name).includes(name)) {
            errors.push("Name already exists")
        }
        if (type.length > 20) {
            errors.push("Type must be 20 characters or less")
        }
        if (description.length > 100) {
            errors.push("Description must be 100 characters or less")
        }
        setErrors(errors);
    }, [name, type, description])

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Group Information</h1>
            <label>
                Name
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Confirm Changes</button>
        </form>
      );
}

export default EditGroupForm;
