import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getGroups } from "../../store/groups";
// import { getGroupDetails } from "../../store/groups";

const GroupIdPage = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groups = useSelector((state) => Object.values(state.groups))
    const group = groups[groupId-2]
    console.log('--------->', groups)

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])

    return (
        <>
            This is my Group ID: {group}
        </>
    )
}

export default GroupIdPage
