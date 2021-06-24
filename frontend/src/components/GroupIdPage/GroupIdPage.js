import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { NavLink } from "react-router-dom";
import Calendar from 'react-calendar'
import EditGroupModal from "../EditGroupFormModal";
import DeleteGroupModal from '../DeleteGroupFormModal'

import './GroupIdPage.css'

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector((state) => (state.groups[groupId]))

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])

    return (
        <div className='group-container'>
            <div className='group__left-div'>
                <div className='group-info'>
                    <h1>{group?.name}</h1>
                    <h3>Type | {group?.type}</h3>
                    <h3>Description | {group?.description}</h3>
                </div>
            </div>
            <div className='group__right-div'>
                <div className='group-calendar'>
                    <h3>Events</h3>
                    <Calendar/>
                </div>
            </div>
            <div className='group-footer'>
                <EditGroupModal />
                <DeleteGroupModal />
            </div>
        </div>
    )
}

export default GroupIdPage
