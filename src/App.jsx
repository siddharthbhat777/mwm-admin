import React from 'react';
import Routers from './utils/Routers';
import classes from './App.module.css';

const App = () => {
  return (
    <div className={classes.app}>
      <Routers />
    </div>
  );
};

export default App;