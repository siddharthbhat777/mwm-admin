import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const DynamicFeed = () => {
    const navigate = useNavigate();
    const categoryId = useParams().categoryId;
    const [categoryMedia, setCategoryMedia] = useState([]);

    useEffect(() => {
        const getMediaByCategory = async () => {
            try {
                const media = await axios.get(`https://mwm.met.edu/api/media/category/${categoryId}`);
                setCategoryMedia(media.data.media);
            } catch (error) {
                console.log(error.message);
            }
        };
        getMediaByCategory();
    }, [categoryId]);

    return (
        <div>
            {
                categoryMedia.map((media) => (
                    <button onClick={() => navigate(`/${categoryId}/${media._id}`)}>{media.title}</button>
                ))
            }
        </div>
    );
};

export default DynamicFeed;