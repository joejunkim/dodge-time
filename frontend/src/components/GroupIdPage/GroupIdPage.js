import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUsers } from "../../store/users";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { getVenues } from "../../store/venues";
import { joinGroup, leaveGroup, getUserGroups } from '../../store/userGroups'
import { Link, NavLink, Route } from "react-router-dom";

import Calendar from 'react-calendar'
import EditGroupModal from "../EditGroupFormModal";
import DeleteGroupModal from '../DeleteGroupFormModal'


import './GroupIdPage.css'

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    let myId = null;

    if (sessionUser) {
        myId = sessionUser.id
    }

    const allUsers = useSelector((state) => Object.values(state.users))
    const group = useSelector((state) => (state.groups[groupId]))
    const allEvents = useSelector((state) => Object.values(state.events))
    const events = allEvents.filter((event) => event.groupId == groupId)
    const allMembers = useSelector((state) => Object.values(state.userGroups))

    // let members = 1;
    // let groupMemberIds = [];
    // allMembers.forEach(member => {
    //     if (member.groupId === groupId) {
    //         members++;
    //         groupMemberIds.push(member.userId)
    //     }
    // })

    const [inGroup, setInGroup] = useState(false)
    const [eventDisplay, setEventDisplay] = useState('list')

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getGroups());
        dispatch(getEvents());
        dispatch(getUserGroups());
        dispatch(getVenues());
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
            <div className='group-events__header'>
                <h1>{group?.name}</h1>
                { myId === group?.ownerId
                    ? (<div>
                            <EditGroupModal />
                            <DeleteGroupModal />
                    </div>)
                    : (<></>)
                }
            </div>
            <div className='group-details'>
                <div className='group-info'>
                    <h3>TYPE</h3>
                    {group?.type}
                    <h3>DETAILS</h3>
                    {group?.city}, {group?.state}
                    <h3>DESCRIPTION</h3>
                    {group?.description}
                    {/* <h3>MEMBERS</h3>
                    <div>
                        Members: {members}
                    </div>
                    <div>
                        {allUsers[group?.ownerId]?.username}
                    </div>
                    {groupMemberIds.map((id) => (
                        <div>{allUsers[id]?.username}</div>
                    ))} */}
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
                        { myId === group?.ownerId
                            ? (<NavLink to={{
                                pathname: '/events/create',
                                userProps: {groupId: groupId}
                            }}>Create a New Event</NavLink>)
                            : (<div />)
                        }
                        <div>
                            <button onClick={(e) => setEventDisplay('list')}>List View</button>
                            <button onClick={(e) => setEventDisplay('calendar')}>Calendar View</button>
                            <p />
                        </div>
                    </div>
                    <div className='group-events__content'>
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
                                        <div className='search-card__name'>{event?.name}</div>
                                        <div className='search-card__info'>{event?.type}</div>
                                        <div className='search-card__info'>{event?.city}, {event?.state}</div>
                                        <div className='search-card__info'>{event?.date} | {event?.time}</div>
                                    </Link>
                                ))}
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupIdPage
