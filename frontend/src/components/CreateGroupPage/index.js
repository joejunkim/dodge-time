import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './CreateGroupPage.css'
import { addGroup, getGroups } from "../../store/groups"

function CreateGroupPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const ownerId = sessionUser.id;
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const groups = useSelector((state) => Object.values(state.groups))

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch, groups])

    useEffect(() => {
        const errors = [];
        if (name.length > 50) {
            errors.push("Name must be 50 characters or less")
        } else if (groups.map(group => group.name).includes(name)) {
            errors.push("Name already exists")
        }
        if (type.length > 50) {
            errors.push("Type must be 50 characters or less")
        }
        if (description.length > 500) {
            errors.push("Description must be 500 characters or less")
        }
        setErrors(errors);
    }, [name, type, description])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            ownerId,
            type,
            description
        }

        const newGroup = await dispatch(addGroup(payload));

        history.push(`/groups/${newGroup.id}`);
    }

    return (
        <form className='create-group__form' onSubmit={handleSubmit}>
            <h1>Create a New Group</h1>
            <label>
                Name
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Type
                <input
                    type='text'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
            </label>
            <label>
                Description
                <textarea
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <button type="submit" disabled={!!errors.length}>Create Group</button>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </form>
    )
}

export default CreateGroupPage
