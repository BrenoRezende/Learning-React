import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import './css/App.css';
import axios from 'axios';
import CustomInput from './components/CustomInput.js';

class App extends Component {

   constructor() {
      super();
      this.state = {
         list: [],
         name:'',
         email:'',
         password:''
      };
      this.sendForm = this.sendForm.bind(this);
      this.setName = this.setName.bind(this);
      this.setEmail = this.setEmail.bind(this);
      this.setPassword = this.setPassword.bind(this);
   }

   componentDidMount() {
      axios.get('http://cdc-react.herokuapp.com/api/autores')
         .then(function(result) {
            this.setState({list:result.data});
         }.bind(this))
         .catch(function(error) {
            console.log(error);
         });
   }

   sendForm(event) {
       event.preventDefault();
       axios.post('http://cdc-react.herokuapp.com/api/autores', {
           nome: this.state.name,
           email:this.state.email,
           senha:this.state.password
       }).then(function(result) {
           console.log("Sent");
           this.setState({list: result.data});
       }.bind(this)).catch(function(result) {
           console.log(result);
       });
   }

   setName(event) {
       this.setState({name: event.target.value});
   }

   setEmail(event) {
       this.setState({email: event.target.value});
   }

   setPassword(event) {
       this.setState({password: event.target.value});
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
                     <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="post">
                         <CustomInput id="name" type="text" name="name" value={this.state.name} onChange={this.setName} label="Name"/>
                         <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
                         <CustomInput id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword} label="Password"/>
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
