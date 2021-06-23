import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGroups } from "../../store/groups";

const SearchPage = () => {
    const dispatch = useDispatch();
    const groups = useSelector((state) => Object.values(state.groups))

    console.log("----------->", groups)

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])

    return (
        <div>
            <h1>Groups</h1>
            <div>
                These are my groups: {groups[1]?.name}
            </div>
        </div>
    );
}

export default SearchPage;
