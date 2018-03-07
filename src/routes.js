import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Tutor from './components/Tutor';
import Gallery from './components/Gallery';
import Performer from './components/Performer';
import Stretch from './components/Stretch';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/tutor" component={Tutor}/>
        <Route path="/photographer" component={Gallery}/>
        <Route path="/performer" component={Performer}/>   
        <Route path="/stretch" component={Stretch}/>     
    </Route>
);