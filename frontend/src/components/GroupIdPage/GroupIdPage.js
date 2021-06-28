import * as sessionActions from '../../store/session';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { getUserGroups } from "../../store/userGroups"
import { Link, NavLink } from "react-router-dom";

import Calendar from 'react-calendar'
import EditGroupModal from "../EditGroupFormModal";
import DeleteGroupModal from '../DeleteGroupFormModal'
import LoginFormModal from "../LoginFormModal"

import { joinGroup, leaveGroup } from '../../store/userGroups'

import './GroupIdPage.css'

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    let myId = null;

    if (sessionUser) {
        myId = sessionUser.id
    }

    const group = useSelector((state) => (state.groups[groupId]))

    const allEvents = useSelector((state) => Object.values(state.events))
    const events = allEvents.filter((event) => event.groupId == groupId)

    // const allUserGroups = useSelector((state) => Object.values(state.userGroups))

    const [inGroup, setInGroup] = useState(false)
    const [eventDisplay, setEventDisplay] = useState('list')

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents());
        dispatch(getUserGroups());
    }, [dispatch, inGroup])

    const joinClick = async () => {
        const payload = {
            userId: myId,
            groupId: groupId
        }
        await dispatch(joinGroup(payload));
        setInGroup(true)
    }

    const leaveClick = async () => {
        await dispatch(leaveGroup(myId, groupId))
        setInGroup(false)
    }

    return (
        <div className='group-container'>
            <div className='group-info'>
                <h1>{group?.name}</h1>
                { myId === group?.ownerId
                    ? (<div>
                            <EditGroupModal />
                            <DeleteGroupModal />
                    </div>)
                    : (<div />)
                }
                <h3>Type</h3>
                {group?.type}
                <h3>Description</h3>
                {group?.description}
                <p />
                { inGroup || myId === group?.ownerId
                    ? (<div>
                            <button onClick={leaveClick}>Leave Group</button>
                    </div>)
                    : ((<div>
                            <button onClick={joinClick}>Join Group</button>
                        </div>))
                }
            </div>
            <div className='group-events'>
                <div className='group-events__header'>
                    <h2>Upcoming Events</h2>
                    <div>
                        <button onClick={(e) => setEventDisplay('list')}>List View</button>
                        <button onClick={(e) => setEventDisplay('calendar')}>Calendar View</button>
                        <p />
                    </div>
                    { myId === group?.ownerId
                        ? (<NavLink to='/events/create'>Create a New Event</NavLink>)
                        : (<div />)
                    }
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
                            <Link key={event} to={`/events/${event.id}`}>
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
