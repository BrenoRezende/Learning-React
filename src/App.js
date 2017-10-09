import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './css/pure-min.css';
import './css/side-menu.css';
import './css/App.css';

class App extends Component {

   render() {
      return (
         <div id="layout">
            {/* Menu toggle */}
            <a href="#menu" id="menuLink" className="menu-link">
               {/* Hamburger icon */}
               <span></span>
            </a>

            <div id="menu">
               <div className="pure-menu">
                  <Link to="/" className="pure-menu-heading">Company</Link>

                  <ul className="pure-menu-list">
                     <li className="pure-menu-item">
                        <Link to="/" className="pure-menu-link">Home</Link>
                     </li>
                     <li className="pure-menu-item">
                        <Link to="/author" className="pure-menu-link">Author</Link>
                     </li>
                     <li className="pure-menu-item">
                        <Link to="/book" className="pure-menu-link">Books</Link>
                     </li>
                  </ul>
               </div>
            </div>

            <div id="main">
                {this.props.children}
            </div>

         </div>
      );
   }
}

export default App;
