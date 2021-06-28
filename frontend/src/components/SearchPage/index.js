import * as sessionActions from '../../store/session';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { Link, NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal"

import './SearchPage.css'

const SearchPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const groups = useSelector((state) => Object.values(state.groups))
    const events = useSelector((state) => Object.values(state.events))
    const [search, setSearch] = useState('groups')
    const [className, setClassName] = useState('active')

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents())
    }, [dispatch])

    return (
        <div>
            <div className='search__options'>
                <button onClick={(e) => setSearch('groups')}>
                    <h1>Groups</h1>
                </button>
                <button onClick={(e) => setSearch('events')}>
                    <h1>Events</h1>
                </button>
            </div>
            <div className='search-container'>
                { search === 'groups'
                    ? (<>
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
                        { sessionUser
                            ? (<NavLink to='/groups/create'>Start a New Group</NavLink>)
                            : (<LoginFormModal/>)
                        }
                    </>)
                    : (<>
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
                    </>)}
            </div>
        </div>
    );
}

export default SearchPage;
