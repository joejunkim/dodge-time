import * as sessionActions from '../../store/session';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { Link, NavLink } from "react-router-dom";
import Calendar from 'react-calendar'
import EditGroupModal from "../EditGroupFormModal";
import DeleteGroupModal from '../DeleteGroupFormModal'
import LoginFormModal from "../LoginFormModal"

import './GroupIdPage.css'

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
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
                <h3>Type</h3>
                {group?.type}
                <h3>Description</h3>
                {group?.description}
                <p />
                { sessionUser
                    ? (<div>
                            <EditGroupModal />
                            <DeleteGroupModal />
                            <button onClick={''}>Join Group</button>
                    </div>)
                    : (<div>
                        <LoginFormModal />
                    </div>)
                }
            </div>
            <div className='group-events'>
                <div className='group-events__header'>
                    <h3>Upcoming Events</h3>
                    <div>
                        <button onClick={(e) => setEventDisplay('list')}>List</button>
                        |
                        <button onClick={(e) => setEventDisplay('calendar')}>Calendar</button>
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
                                    <div className='search-card__name'>{event.name}</div>
                                    <div className='search-card__type'>{event.type}</div>
                                    <div className='search-card__type'>{event.date}</div>
                                </Link>
                            ))}
                        </div>
                    </>)}
            </div>
        </div>
    )
}

export default GroupIdPage
