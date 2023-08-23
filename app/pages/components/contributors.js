import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Contributors = ({contributor_url}) => {
    const [conntributorData, setContributorData] = useState([]);
    const navigate = useNavigate();

    const fetch_contributors = async () => {
        const response = await axios.get(contributor_url);
        const data = response?.data;
        console.log(data);
        setContributorData(data);
    }

    useEffect(() => {
        fetch_contributors();
    }, []);

    console.log(contributor_url);
    return (
        <div className='contributors-avatar'>
            {conntributorData?.map((contributor, index) => (
                <div key={index} className='avatar'>
                   <a href = {contributor?.html_url} target="_blank"><img src={contributor?.avatar_url} alt="avatar"/></a>
                </div>
            ))}
        </div>
    )
}

export default Contributors;
