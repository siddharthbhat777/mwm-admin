import React from 'react'
import { useParams } from 'react-router-dom';

const Video = () => {
    const mediaId = useParams().mediaId;
    return (
        <div style={{ color: 'white' }}>{mediaId}</div>
    )
}

export default Video