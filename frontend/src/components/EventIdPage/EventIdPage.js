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
import LoginFormModal from "../LoginFormModal"

import './EventIdPage.css'

const EventIdPage = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const event = useSelector((state) => (state.events[eventId]))
    const group = useSelector((state) => (state.groups[event?.groupId]))
    const sessionUser = useSelector(state => state.session.user);
    let myId = null;

    if (sessionUser) {
        myId = sessionUser.id
    }

    const [inEvent, setInEvent] = useState(false)

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getGroups());
        dispatch(getRSVPS());
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
            <div className='event-info'>
                <h1>{event?.name}</h1>
                { sessionUser?.id === event?.hostId
                    ? (<div>
                        <EditEventModal />
                        <DeleteEventModal />
                    </div>)
                    : (<div />)
                }
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

// (<div>
//     <LoginFormModal />
// </div>)
