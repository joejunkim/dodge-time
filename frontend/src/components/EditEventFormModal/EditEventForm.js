import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { updateEvent } from '../../store/events'

import './EditEventForm.css'

function EditEventForm() {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const events = useSelector((state) => Object.values(state.events))
    const event = useSelector((state) => (state.events[eventId]))
    const venues = useSelector((state) => Object.values(state.venues))

    const [name, setName] = useState(event.name);
    const [type, setType] = useState(event.type);
    const [date, setDate] = useState(event.date);
    const [capacity, setCapacity] = useState(event.capacity);
    const [city, setCity] = useState(event.city);
    const [state, setState] = useState(event.state);
    const [time, setTime] = useState(event.time);
    const [venue, setVenue] = useState(event.venue);
    const [description, setDescription] = useState(event.description)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            type,
            date,
            capacity,
            city,
            state,
            time,
            description,
            venueId: 1
        }

        await dispatch(updateEvent(payload, eventId))
        window.location.reload(false);
    };

    useEffect(() => {
        const errors = [];
        if (name.length > 20) {
            errors.push("Name must be 20 characters or less")
        } else if (events.map(event => event.name).includes(name)) {
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
        <form className='edit-form' onSubmit={handleSubmit}>
            <h1>Edit Event Information</h1>
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
                    <option>Casual / New Players</option>
                    <option>Casual / Experienced Players</option>
                    <option>Competitive / New Players</option>
                    <option>Competitive / Experienced Players</option>
                </select>
            </div>
            <div className='edit-field'>
                <label className='edit-label'>Date</label>
                <input
                    className='edit-input'
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className='edit-field'>
                <label className='edit-label'>Time</label>
                <input
                    className='edit-input'
                    type='text'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <div className='edit-field'>
                <label className='edit-label'>Venue</label>
                <select
                    className='edit-input'
                    type='text'
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                >
                <option>--- select one ---</option>
                {venues?.map((venue) => (
                    <option>{venue?.name}</option>
                ))}
                </select>
            </div>
            <div className='edit-field'>
                <label className='edit-label'>Capacity</label>
                <input
                    className='edit-input'
                    type='text'
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />
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

export default EditEventForm;
