import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [media, setMedia] = useState([]);

    useEffect(() => {
        const getAllMedia = async () => {
            try {
                const media = await axios.get('https://mwm.met.edu/api/media/all');
                setMedia(media.data.media)
            } catch (error) {
               console.log(error.message); 
            }
        };
        getAllMedia();
    }, []);

    return (
        <div>
            {
                media.map((singleMedia) => (
                    <div style={{ color: 'white' }}>{singleMedia.title}</div>
                ))
            }
        </div>
    );
};

export default Dashboard;