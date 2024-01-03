import React from 'react';
import classes from './Loader.module.css';
import { Oval } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className={classes.loaderWrapper}>
            <Oval
                height={80}
                width={80}
                color='#DA251C'
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor='#d65050'
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    );
};

export default Loader;