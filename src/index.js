import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Home';
import AuthorBox from './Author';
import BookBox from './Book';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
   <Router>
     <App>
         <Switch>
             <Route exact path='/' component={Home} />
             <Route path='/author' component={AuthorBox} />
             <Route path='/book' component={BookBox} />
         </Switch>
     </App>
   </Router>,
   document.getElementById('root')
);
registerServiceWorker();
