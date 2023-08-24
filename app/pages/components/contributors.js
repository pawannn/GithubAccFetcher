import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contributors = ({contributor_url}) => {
    const [conntributorData, setContributorData] = useState([]);

    const fetch_contributors = async () => {
        const response = await axios.get(contributor_url);
        const data = response?.data;
        setContributorData(data);
    }

    useEffect(() => {
        fetch_contributors();
    }, []);
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
