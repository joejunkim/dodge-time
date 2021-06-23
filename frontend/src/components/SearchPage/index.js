import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getGroups } from "../../store/groups";
import { Link, NavLink } from "react-router-dom";

import './SearchPage.css'

const SearchPage = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state) => Object.values(state.groups))

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])

    return (
        <div>
            <h1 className='search-body'>Groups</h1>
            <div className='search-container'>
                {groups.map((group) => (
                    <div className='search-card'>
                        <Link to={`/groups/${group.id}`}>
                            <div className='search-card__name'>
                                {group.name}
                            </div>
                            <div className='search-card__type'>
                                {group.type}
                            </div>
                            <div className='search-card__description'>
                                {group.description}
                            </div>
                        </Link>
                    </div>
                ))}
                <NavLink to='/groups/create'>Start a New Group</NavLink>
            </div>
        </div>
    );
}

export default SearchPage;
