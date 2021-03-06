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

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents())
    }, [dispatch])

    return (
        <div>
            <div className='search-options'>
                <button onClick={(e) => setSearch('groups')}>
                    <h1>Groups</h1>
                </button>
                <button onClick={(e) => setSearch('events')}>
                    <h1>Events</h1>
                </button>
                { sessionUser
                        ? (<NavLink className='search-link' to='/groups/create'>Start a New Group</NavLink>)
                        : (<LoginFormModal className='search-link'/>)
                    }
            </div>
            <div className='search-container'>
                <div>
                    { search === 'groups'
                        ? (<>
                            {groups.map((group) => (
                                <div className='search-card'>
                                    <Link to={`/groups/${group.id}`}>
                                        <div className='search-card__name'>
                                            {group?.name}
                                            </div>
                                        <div className='search-card__info'>
                                            {group?.type}
                                        </div>
                                        <div className='search-card__info'>
                                            {group?.city}, {group?.state}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </>)
                        : (<>
                            {events.map((event) => (
                                <div className='search-card'>
                                    <Link to={`/events/${event.id}`}>
                                        <div className='search-card__name'>
                                            {event?.name}
                                        </div>
                                        <div className='search-card__info'>
                                            {event?.type}
                                        </div>
                                        <div className='search-card__info'>
                                            {event?.city}, {event?.state} || {event?.date} | {event?.time}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </>)}
                </div>
                <img src='https://scontent-sea1-1.xx.fbcdn.net/v/t31.18172-8/13403167_10100430665250505_5314196127557035312_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=825194&_nc_ohc=2OdjrhJzCCwAX9c4Ff8&_nc_ht=scontent-sea1-1.xx&oh=0e5515a2566f635422d363201bcfd67a&oe=60DDD43E' alt='dodgeball-game-pic' className='search-image'/>
            </div>
        </div>
    );
}

export default SearchPage;
