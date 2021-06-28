import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { updateGroup } from '../../store/groups'

import './EditGroupForm.css'

function EditGroupForm() {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groups = useSelector((state) => Object.values(state.groups))
    const group = useSelector((state) => (state.groups[groupId]))

    const [name, setName] = useState(group.name);
    const [type, setType] = useState(group.type);
    const [city, setCity] = useState(group.city);
    const [state, setState] = useState(group.state);
    const [description, setDescription] = useState(group.description)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            type,
            city,
            state,
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
        if (type === '--- select one ---') {
            errors.push("Please choose a valid group type")
        }
        if (state.length > 2) {
            errors.push("Please abbreviate the state name")
        }
        if (description.length > 500) {
            errors.push("Description must be 500 characters or less")
        }
        setErrors(errors);
    }, [name, type, description])

    return (
        <form className='edit-form' onSubmit={handleSubmit}>
            <h1>Edit Group Information</h1>
            <div className='edit-field'>
                <label className='edit-label'>Name</label>
                <input
                    className='edit-input'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className='edit-field'>
                <label className='edit-label'>Type</label>
                <select
                    className='edit-input'
                    type='text'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option>--- select one ---</option>
                    <option>🟢 Casual / New Players</option>
                    <option>🔵 Casual / Experienced Players</option>
                    <option>🟡 Competitive / New Players</option>
                    <option>🔴 Competitive / Experienced Players</option>
                </select>
            </div>
            <div className='edit-field'>
                <label className='edit-label'>City</label>
                <input
                    className='edit-input'
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </div>
            <div className='edit-field'>
                <label className='edit-label'>State</label>
                <input
                    className='edit-input'
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </div>
            <div className='edit-field'>
                <label className='edit-label'>Description</label>
                <textarea
                    className='edit-input'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button id='edit-button' type="submit">Confirm Changes</button>
            {errors.map((error, idx) => <span key={idx}>{error}</span>)}
        </form>
      );
}

export default EditGroupForm;
