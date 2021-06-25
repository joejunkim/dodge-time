import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router";

import { deleteEvent } from "../../store/events";

function DeleteEventForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { eventId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteEvent(eventId))
        history.push('/find')
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Are you sure you want to delete this event?</h1>
            <button type="submit">Delete Event</button>
        </form>
      );
}

export default DeleteEventForm;
