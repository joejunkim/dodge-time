import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
import { NavLink } from "react-router-dom";
import DeleteGroupModal from '../DeleteGroupFormModal'

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const group = useSelector((state) => (state.groups[groupId]))

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])

    return (
        <>
            <h1>{group?.name}</h1>
            <h3>{group?.type}</h3>
            <h3>{group?.description}</h3>
            <DeleteGroupModal>Delete Group</DeleteGroupModal>
        </>
    )
}

export default GroupIdPage
