import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/landing';
import OrphanegesMap from './pages/OrphanegesMap/OrphanegesMap';
import Orphaneges from './pages/Orphanege';
import CreateOrphanege from './pages/CreateOrphanege';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path ="/" exact component ={Landing}/>
                <Route path ="/app" component ={OrphanegesMap}/>
                <Route path ="/orphanages/create" component ={CreateOrphanege}/>
                <Route path ="/orphanages/:id" component ={Orphaneges}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;