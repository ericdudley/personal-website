import React from 'react';
import Sitemap from 'react-router-sitemap';
import { Route, IndexRoute } from 'react-router';

(
   new Sitemap(<Route path="/">}>
   <IndexRoute />
   <Route path="/tutor" />
   <Route path="/photographer" />
   <Route path="/performer"/>        
   </Route>)
       .build('http://ericdudley.com')
       .save('./sitemap.xml')
);