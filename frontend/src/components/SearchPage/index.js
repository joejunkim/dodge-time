import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { Link, NavLink } from "react-router-dom";

import './SearchPage.css'

const SearchPage = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state) => Object.values(state.groups))
    const events = useSelector((state) => Object.values(state.events))
    const [search, setSearch] = useState('groups')

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents())
    }, [dispatch])

    return (
        <div>
            <button onClick={(e) => setSearch('groups')}>Groups</button>|
            <button onClick={(e) => setSearch('events')}>Events</button>
            <div className='search-container'>
                { search === 'groups'
                    ? (<>
                        <h1>Groups</h1>
                        {groups.map((group) => (
                            <div className='search-card'>
                                <Link to={`/groups/${group.id}`}>
                                    <div className='search-card__name'>
                                        {group.name}
                                        </div>
                                    <div className='search-card__type'>
                                        {group.type}
                                    </div>
                                </Link>
                            </div>
                        ))}
                        <NavLink to='/groups/create'>Start a New Group</NavLink>
                    </>)
                    : (<>
                        <h1>Events</h1>
                        {events.map((event) => (
                            <div className='search-card'>
                                <Link to={`/events/${event.id}`}>
                                    <div className='search-card__name'>
                                        {event.name}
                                    </div>
                                    <div className='search-card__type'>
                                        {event.type}
                                    </div>
                                    <div className='search-card__type'>
                                        {event.date}
                                    </div>
                                </Link>
                            </div>
                        ))}
                        <NavLink to='/events/create'>Create a New Event</NavLink>
                    </>)}
            </div>
        </div>
    );
}

export default SearchPage;
