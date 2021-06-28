import * as sessionActions from '../../store/session';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { getUserGroups } from "../../store/userGroups"
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

    // const allUserGroups = useSelector((state) => Object.values(state.userGroups))

    const [groupArray, setGroupArray] = useState([])

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents());
    }, [dispatch])

    useEffect(async () => {
        const testArray = []
        const testUserGroup = await dispatch(getUserGroups(myId));
        Object.values(testUserGroup).forEach(testGroup => {
            testArray.push(testGroup.groupId)
        })
        setGroupArray(testArray)
    }, [dispatch])

    return (
        <>
            <h1>{myUserName}'s Profile</h1>
            <h2>My Groups</h2>
            <h3>Organizer</h3>
            {ownedGroups?.map((group) => (
                <Link to={`/groups/${group.id}`}>
                    <div className='search-card__name'>{group?.name}</div>
                    <div className='search-card__type'>{group?.type}</div>
                    <div className='search-card__type'>{group?.date}</div>
                </Link>
            ))}
            <h3>Member</h3>
            {groupArray?.map((group) => (
                <Link to={`/groups/${group}`}>
                    <div className='search-card__type'>{allGroupsObject[group].name}</div>
                    <div className='search-card__type'>{group?.date}</div>
                </Link>
            ))}
            <h2>My Events</h2>
            <h3>Hosting</h3>
            <h3>RSVP'd</h3>
        </>
    )
}

export default MyAccountPage;
