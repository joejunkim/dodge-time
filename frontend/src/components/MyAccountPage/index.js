import * as sessionActions from '../../store/session';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { Link, NavLink } from "react-router-dom";

import './MyAccountPage.css'

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const myUserName = sessionUser.username
    const myId = sessionUser.id

    const allEvents = useSelector((state) => Object.values(state.events))
    const events = allEvents.filter((event) => event.hostId == myId)

    return (
        <>
            <h1>{myUserName}'s Profile</h1>
            <h2>My Groups</h2>
            <h3>Organizer</h3>
            <h3>Member</h3>
            <h2>My Events</h2>
            <h3>Hosting</h3>
            {events.map((event) => (
                <Link to={`/events/${event.id}`}>
                    <div className='search-card__name'>{event.name}</div>
                    <div className='search-card__type'>{event.type}</div>
                    <div className='search-card__type'>{event.date}</div>
                </Link>
            ))}
            <h3>RSVP'd</h3>
        </>
    )
}

export default MyAccountPage;
