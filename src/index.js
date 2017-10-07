import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import AuthorBox from './Author';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <Router>
      <Switch>
         <Route path='/' component={App}/>
         <Route path='/author' component={AuthorBox}/>
         <Route path='/book'/>
      </Switch>
   </Router>,
   document.getElementById('root')
);
registerServiceWorker();
