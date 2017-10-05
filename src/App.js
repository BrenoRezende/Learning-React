import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import './css/App.css';
import axios from 'axios'

class App extends Component {

   constructor() {
      super();
      this.state = {
         list: []
      };
   }

   componentDidMount() {
      axios.get('http://cdc-react.herokuapp.com/api/autores')
         .then(function(result) {
            console.log(result);
            this.setState({list:result.data});
         }.bind(this))
         .catch(function(error) {
            console.log(error);
         });
   }

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
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                     <li className="pure-menu-item">
                        <a href="#" className="pure-menu-link">Home</a>
                     </li>
                     <li className="pure-menu-item">
                        <a href="#" className="pure-menu-link">Author</a>
                     </li>
                     <li className="pure-menu-item">
                        <a href="#" className="pure-menu-link">Books</a>
                     </li>
                  </ul>
               </div>
            </div>

            <div id="main">
               <div className="header">
                  <h1>Author's Register</h1>
               </div>
               <div className="content" id="content">
                  <div className="pure-form pure-form-aligned">
                     <form className="pure-form pure-form-aligned">
                        <div className="pure-control-group">
                           <label htmlFor="nome">Name</label>
                           <input id="nome" type="text" name="nome" value=""/>
                        </div>
                        <div className="pure-control-group">
                           <label htmlFor="email">Email</label>
                           <input id="email" type="email" name="email" value=""/>
                        </div>
                        <div className="pure-control-group">
                           <label htmlFor="senha">Password</label>
                           <input id="senha" type="password" name="senha"/>
                        </div>
                        <div className="pure-control-group">
                           <label></label>
                           <button type="submit" className="pure-button pure-button-primary">Send</button>
                        </div>
                     </form>

                  </div>
                  <div>
                     <table className="pure-table">
                        <thead>
                           <tr>
                              <th>Name</th>
                              <th>Email</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              this.state.list.map(function(author) {
                                 return (
                                    <tr key={author.id}>
                                       <td>{author.nome}</td>
                                       <td>{author.email}</td>
                                    </tr>
                                 );
                             })
                           }
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

         </div>
      );
   }
}

export default App;
