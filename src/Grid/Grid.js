import React from 'react';
import { Switch,Route } from 'react-router-dom';
import classes from './Grid.module.css';

import TopBar from '../Components/Grid/TopBar/TopBar';
import Nav from '../Components/Grid/Nav/Nav';
import Categories from '../Pages/Categories/cat';
import Profile from '../Pages/Profile/Profile';
import Inbox from '../Pages/Inbox/Inbox';

const Grid=(props)=>{

    //return starts here.....
    return (
        <React.Fragment>
            
            {/* Top bar starts here..... */}
            <TopBar />
            {/* Top Bar ends here....... */}



            {/* Left right grid starts here.... */}
            <div className={classes.container}>
                <div className={classes.leftContainer}>
                    <Nav />
                </div>
                <div className={classes.rightContainer}>
                    <Switch>
                        <Route exact path="/" component={Categories} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/inbox" component={Inbox}/>
                    </Switch>
                </div>
            </div>
            {/* Left right grid ends here...... */}

        </React.Fragment>
    );
    //return ends here.......

}//.....................

export default Grid;