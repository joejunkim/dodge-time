import * as sessionActions from '../../store/session';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { getUserGroups } from "../../store/userGroups"
import { getRSVPS } from '../../store/rsvps';
import { Link, NavLink } from "react-router-dom";

import './MyAccountPage.css'

const MyAccountPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const myUserName = sessionUser.username
    const myId = sessionUser.id

    const allGroups = useSelector((state) => Object.values(state.groups))
    const allGroupsObject = useSelector((state) => (state.groups))
    const ownedGroups = allGroups.filter((group) => group.ownerId == myId)

    const allEvents = useSelector((state) => Object.values(state.events))
    const allEventsObject = useSelector((state) => state.events)
    const hostEvents = allEvents.filter((event) => event.hostId == myId)

    const [groupArray, setGroupArray] = useState([])
    const [eventArray, setEventArray] = useState([])
    const [search, setSearch] = useState('groups')


    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents());
    }, [dispatch])

    useEffect(async () => {
        const tempGroupArray = []
        const tempUserGroup = await dispatch(getUserGroups(myId));
        Object.values(tempUserGroup).forEach(testGroup => {
            tempGroupArray.push(testGroup.groupId)
        })
        setGroupArray(tempGroupArray)
    }, [dispatch])

    useEffect(async () => {
        const tempEventArray = []
        const tempRSVP = await dispatch(getRSVPS(myId));
        {console.log('------------>', tempRSVP)}
        Object.values(tempRSVP).forEach(rsvp => {
            tempEventArray.push(rsvp.eventId)
        })
        setEventArray(tempEventArray)
    }, [dispatch])

    return (
        <>
            <h1 className='account-profile'>{myUserName}'s Profile</h1>
            <div className='account-options'>
                <button onClick={(e) => setSearch('groups')}>
                    <h2>My Groups</h2>
                </button>
                <button onClick={(e) => setSearch('events')}>
                    <h2>My Events</h2>
                </button>
            </div>
            { search === 'groups'
                ? (<div className='account-container'>
                    <div className='account-container__left'>
                        <h2>Organizer</h2>
                        {ownedGroups?.map((group) => (
                            <Link to={`/groups/${group.id}`}>
                                <div className='search-card__name'>{group?.name}</div>
                                <div className='search-card__info'>{group?.type}</div>
                                <div className='search-card__info'>{group?.city}, {group?.state}</div>
                            </Link>
                        ))}
                    </div>
                    <div className='account-container__right'>
                        <h2>Member</h2>
                        {groupArray?.map((group) => (
                            <Link to={`/groups/${group}`}>
                                <div className='search-card__name'>{allGroupsObject[group].name}</div>
                                <div className='search-card__info'>{allGroupsObject[group].type}</div>
                                <div className='search-card__info'>{allGroupsObject[group].city}, {allGroupsObject[group].state}</div>
                            </Link>
                        ))}
                    </div>
                </div>)
                : (<div className='account-container'>
                    <div className='account-container__left'>
                        <h2>Hosting</h2>
                        {hostEvents?.map((event) => (
                            <Link to={`/events/${event.id}`}>
                                <div className='search-card__name'>{event?.name}</div>
                                <div className='search-card__info'>{event?.type}</div>
                                <div className='search-card__info'>{event?.city}, {event?.state}</div>
                                <div className='search-card__info'>{event?.date} | {event?.time}</div>
                            </Link>
                        ))}
                    </div>
                    <div className='account-container__right'>
                        <h2>RSVP'd</h2>
                        {eventArray?.map((event) => (
                            <Link to={`/events/${event}`}>
                                <div className='search-card__name'>{allEventsObject[event].name}</div>
                                <div className='search-card__info'>{allEventsObject[event].type}</div>
                                <div className='search-card__info'>{allEventsObject[event].city}, {allEventsObject[event].state}</div>
                                <div className='search-card__info'>{allEventsObject[event].date} | {allEventsObject[event].time}</div>
                            </Link>
                        ))}
                    </div>
                </div>)}
        </>
    )
}

export default MyAccountPage;
