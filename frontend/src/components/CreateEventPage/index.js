import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";

import './CreateEventPage.css'
import { addEvent, getEvents } from "../../store/events"

function CreateEventPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const myId = sessionUser.id
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState(new Date());
    const [capacity, setCapacity] = useState();
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const location = useLocation();

    const events = useSelector((state) => Object.values(state.events))

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch, events])

    useEffect(() => {
        const errors = [];
        if (name.length > 20) {
            errors.push("Name must be 50 characters or less")
        } else if (events.map(event => event.name).includes(name)) {
            errors.push("Name already exists")
        }
        if (type.length > 50) {
            errors.push("Type must be 50 characters or less")
        }
        if (description.length > 500) {
            errors.push("Description must be 500 characters or less")
        }
        setErrors(errors);
    }, [name, type, date, capacity, description])

    const venueId = 1;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            type,
            date,
            capacity,
            description,
            hostId: myId,
            groupId: location.userProps.groupId,
            venueId
        }

        const newEvent = await dispatch(addEvent(payload));

        history.push(`/events/${newEvent.id}`);
    }

    return (
        <form className='create-event__form' onSubmit={handleSubmit}>
            <h1>Create a New Event</h1>
            <label>Name</label>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label>Type</label>
            <input
                type='text'
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
            />
            <label>Date</label>
            <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <label>Capacity</label>
            <input
                type='integer'
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
            />
            <label>Description</label>
            <textarea
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <p />
            <button type="submit" disabled={!!errors.length}>Create Event</button>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </form>
    )
}

export default CreateEventPage
