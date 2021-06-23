import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findGroups } from "../../store/groups";
import { useDispatch } from "react-redux";

function SearchPage() {
    return (
        <div>
            <h1>Groups</h1>
            <ul>

            </ul>
        </div>
    );
}

export default SearchPage;
