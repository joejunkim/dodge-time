import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { updateGroup } from '../../store/groups'

function EditGroupForm() {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groups = useSelector((state) => Object.values(state.groups))
    const group = useSelector((state) => (state.groups[groupId]))

    const [name, setName] = useState(group.name);
    const [type, setType] = useState(group.type);
    const [description, setDescription] = useState(group.description)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            type,
            description
        }

        await dispatch(updateGroup(payload, groupId))
        window.location.reload(false);
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
                    placeholder={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Type
                <input
                    type='text'
                    placeholder={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
            </label>
            <label>
                Description
                <textarea
                    type='text'
                    placeholder={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Confirm Changes</button>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </form>
      );
}

export default EditGroupForm;
