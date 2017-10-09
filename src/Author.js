import React, {Component} from 'react';
import axios from 'axios';
import CustomInput from './components/CustomInput.js';
import PubSub from 'pubsub-js';
import ErrorHandler from './ErrorHandler';

class AuthorForm extends Component {

    constructor() {
        super();
        this.state = {
           name:'',
           email:'',
           password:''
        };

        this.sendForm = this.sendForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    sendForm(event) {
        event.preventDefault();
        axios.post('http://cdc-react.herokuapp.com/api/autores', {
            nome: this.state.name,
            email:this.state.email,
            senha:this.state.password
        })
        .then(function(result) {
            console.log("Sent");
            PubSub.publish('author-list-updated', result.data);
            this.setState({name: '', email: '', password: ''});
        }.bind(this))
        .catch(function(result) {
            var response = result.response.data;
            if (response.status === 400) {
                new ErrorHandler().publishErrors(response.errors);
            }
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
        return(
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
        );
    }
}

class AuthorList extends Component {

    render() {
        return(
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
                        this.props.authorList.map(function(author) {
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
        );
    }
}

export default class AuthorBox extends Component {

    constructor() {
       super();
       this.state = {
          list: []
       };
    }

    componentDidMount() {
       axios.get('http://cdc-react.herokuapp.com/api/autores')
          .then(function(result) {
             this.setState({list:result.data});
          }.bind(this))
          .catch(function(error) {
             console.log(error);
          });

          PubSub.subscribe('author-list-updated', function(topic, newList) {
              this.setState({list: newList});
          }.bind(this));
    }

    render() {
        return(
            <div>
                <div className="header">
                   <h1>Author's register</h1>
                </div>
                <div className="content" id="content">
                    <AuthorForm />
                    <AuthorList authorList={this.state.list} />
                </div>
            </div>
        );
    }
}
