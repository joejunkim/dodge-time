import * as sessionActions from '../../store/session';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getEvents } from "../../store/events";
import { getGroups } from "../../store/groups";
import { acceptEvent, declineEvent, getRSVPS } from '../../store/rsvps';
import { Link } from 'react-router-dom'

import EditEventModal from "../EditEventFormModal"
import DeleteEventModal from "../DeleteEventFormModal";

import './EventIdPage.css'
import { getVenues } from '../../store/venues';

const EventIdPage = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector((state) => (state.events[eventId]))
    const group = useSelector((state) => (state.groups[event?.groupId]))
    const venue = useSelector((state) => (state.venues[event?.venueId]))
    const sessionUser = useSelector(state => state.session.user);
    let myId = null;

    console.log('---------->', venue)

    if (sessionUser) {
        myId = sessionUser.id
    }

    const [inEvent, setInEvent] = useState(false)

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getGroups());
        dispatch(getRSVPS());
        dispatch(getVenues());
    }, [dispatch])

    const joinClick = async () => {
        const payload = {
            userId: myId,
            eventId: eventId
        }
        await dispatch(acceptEvent(payload));
        setInEvent(true)
    }

    const leaveClick = async () => {
        await dispatch(declineEvent(myId, eventId))
        setInEvent(false)
    }

    return (
        <div className='event-container'>
            <div className='event-header'>
                <h1>{event?.name}</h1>
                { sessionUser?.id === event?.hostId
                    ? (<div>
                        <EditEventModal />
                        <DeleteEventModal />
                    </div>)
                    : (<></>)
                }
            </div>
            <div className='event-info'>
                <h3>TYPE</h3>
                {event?.type}
                <h3>DETAILS</h3>
                <div>
                    {venue?.name} | Capacity: {event?.capacity}
                </div>
                <div>
                    {venue?.address}
                </div>
                <div>
                    {event?.city}, {event?.state}
                </div>
                <div>
                    {event?.date} | {event?.time}
                </div>
                <h3>DESCRIPTION</h3>
                {event?.description}
                <h3>HOSTED BY</h3>
                <Link to={`/groups/${group?.id}`}>
                    {group?.name}
                </Link>
                <p />
                { inEvent || myId === event?.hostId
                    ? (<div>
                            <button onClick={leaveClick}>Decline RSVP</button>
                    </div>)
                    : ((<div>
                            <button onClick={joinClick}>Accept RSVP</button>
                        </div>))
                }
            </div>
        </div>
    )
}

export default EventIdPage
