import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { getEvents } from "../../store/events";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar'
import EditGroupModal from "../EditGroupFormModal";
import DeleteGroupModal from '../DeleteGroupFormModal'

import './GroupIdPage.css'

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector((state) => (state.groups[groupId]))
    const allEvents = useSelector((state) => Object.values(state.events))
    const events = allEvents.filter((event) => event.groupId == groupId)


    useEffect(() => {
        dispatch(getGroups());
        dispatch(getEvents());
    }, [dispatch])

    return (
        <div className='group-container'>
            <div className='group-info'>
                <h1>{group?.name}</h1>
                <h3>Type | {group?.type}</h3>
                <h3>Description | {group?.description}</h3>
            </div>
            <div className='group-calendar'>
                <h3>Events Calendar</h3>
                <Calendar/>
            </div>
            <h3>Events</h3>
            {events.map((event) => (
                <Link to={`/events/${event.id}`}>
                    {event.name}
                </Link>
            ))}
            <div className='group-footer'>
                <EditGroupModal />
                <DeleteGroupModal />
            </div>
        </div>
    )
}

export default GroupIdPage
