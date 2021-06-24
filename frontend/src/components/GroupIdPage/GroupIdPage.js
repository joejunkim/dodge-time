import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { Link, NavLink } from "react-router-dom";
import Calendar from 'react-calendar'
import EditGroupModal from "../EditGroupFormModal";
import DeleteGroupModal from '../DeleteGroupFormModal'

import './GroupIdPage.css'

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector((state) => (state.groups[groupId]))
    const allEvents = useSelector((state) => Object.values(state.events))
    const events = allEvents.filter((event) => event.groupId == groupId)

    const [eventDisplay, setEventDisplay] = useState('list')

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents());
    }, [dispatch])

    return (
        <div className='group-container'>
            <div className='group-info'>
                <h1>{group?.name}</h1>
                <h3>Type | {group?.type}</h3>
                <h3>Description | {group?.description}</h3>
                <div>
                    <EditGroupModal />
                    <DeleteGroupModal />
                </div>
            </div>
            <div className='group-events'>
                <div className='groups-events__header'>
                    <h3>Upcoming Events</h3>
                    <div>
                        <Link onClick={(e) => setEventDisplay('list')}>List</Link>
                        |
                        <Link onClick={(e) => setEventDisplay('calendar')}>Calendar</Link>
                        <p></p>
                        <NavLink to='/events/create'>Create a New Event</NavLink>
                    </div>
                </div>
                { eventDisplay === 'calendar'
                    ? (<>
                        <div className='group-events__calendar'>
                            <Calendar/>
                        </div>
                </>)
                : (<>
                        <div className='group-events__list'>
                            {events.map((event) => (
                                <Link to={`/events/${event.id}`}>
                                    {event.name}
                                </Link>
                            ))}
                        </div>
                    </>)}
            </div>
        </div>
    )
}

export default GroupIdPage
