import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getEvents } from "../../store/events";
import { getGroups } from "../../store/groups";
import { Link } from 'react-router-dom'

import './EventIdPage.css'

const EventIdPage = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector((state) => (state.events[eventId]))
    const group = useSelector((state) => (state.groups[event?.groupId]))

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getGroups());
    }, [dispatch])

    return (
        <div className='event-container'>
            <div className='event-info'>
                <h1>{event?.name}</h1>
                <h3>Type | {event?.type}</h3>
                <h3>Date | {event?.date}</h3>
                <h3>Description | {event?.description}</h3>
                <h3>Hosted By | 
                    <Link to={`/groups/${group?.id}`}>
                        {group?.name}
                    </Link>
                </h3>
            </div>
            <div className='event-calendar'>
                <h3>Events</h3>
                {/* <Calendar/> */}
            </div>
            <div className='event-footer'>
                {/* <EditEventModal /> */}
                {/* <DeleteEventModal /> */}
            </div>
        </div>
    )
}

export default EventIdPage
