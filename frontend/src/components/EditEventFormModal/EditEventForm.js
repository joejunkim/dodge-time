import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { updateEvent } from '../../store/events'

function EditEventForm() {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const events = useSelector((state) => Object.values(state.events))
    const event = useSelector((state) => (state.events[eventId]))

    const [name, setName] = useState(event.name);
    const [type, setType] = useState(event.type);
    const [description, setDescription] = useState(event.description)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            type,
            description
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
        <form onSubmit={handleSubmit}>
            <h1>Edit Event Information</h1>
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

export default EditEventForm;
