import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGroups } from "../../store/groups";

import './SearchPage.css'

const SearchPage = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state) => Object.values(state.groups))

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])

    return (
        <div>
            <h1>Groups</h1>
            <div className='search-container'>
                {groups.map((group) => (
                    <div className='search-card'>
                        <div className='search-card__name'>
                            {group.name}
                        </div>
                        <div className='search-card__type'>
                            {group.type}
                        </div>
                        <div className='search-card__description'>
                            {group.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
