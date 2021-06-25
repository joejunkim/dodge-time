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
                <h3>Type</h3>
                {event?.type}
                <h3>Date</h3>
                {event?.date}
                <h3>Description</h3>
                {event?.description}
                <h3>Hosted By</h3>
                <Link to={`/groups/${group?.id}`}>
                    {group?.name}
                </Link>

            </div>
            <div className='event-footer'>
                {/* <EditEventModal /> */}
                {/* <DeleteEventModal /> */}
            </div>
        </div>
    )
}

export default EventIdPage