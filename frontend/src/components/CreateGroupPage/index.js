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
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            ownerId,
            type,
            city,
            state,
            description
        }

        const newGroup = await dispatch(addGroup(payload));

        history.push(`/groups/${newGroup.id}`);
    }

    return (
        <form className='create-group__form' onSubmit={handleSubmit}>
            <h1>Create a New Group</h1>
            <div className='create-group__field'>
                <label className='create-group__label'>Name</label>
                <input
                    className='create-group__input'
                    type='text'
                    value={name}
                    placeholder='Name of Your Group'
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className='create-group__field'>
                <label className='create-group__label'>Type</label>
                <select
                    className='create-group__input'
                    type='text'
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    required
                >
                    <option>--- select one ---</option>
                    <option>Casual / New Players</option>
                    <option>Casual / Experienced Players</option>
                    <option>Competitive / New Players</option>
                    <option>Competitive / Experienced Players</option>
                </select>
            </div>
            <div className='create-group__field'>
                <label className='create-group__label'>City</label>
                <input
                    className='create-group__input'
                    type='text'
                    value={city}
                    placeholder='ex. Seattle'
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </div>
            <div className='create-group__field'>
                <label className='create-group__label'>State</label>
                <input
                    className='create-group__input'
                    type='text'
                    value={state}
                    placeholder='ex. WA'
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </div>
            <div className='create-group__field'>
                <label className='create-group__label'>Description</label>
                <textarea
                    className='create-group__input'
                    type='text'
                    value={description}
                    placeholder='Describe your group for the world to see!'
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button id='create-group__button' type="submit" disabled={!!errors.length}>Create Group</button>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </form>
    )
}

export default CreateGroupPage
