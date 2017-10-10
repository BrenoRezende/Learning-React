import React, {Component} from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import CustomInput from './components/CustomInput';

export default class BookBox extends Component {

   constructor() {
      super();
      this.state = {
         authors: [],
         books: []
      };
   }

   componentDidMount() {
         axios.get('http://cdc-react.herokuapp.com/api/autores')
            .then(function(result) {
               this.setState({authors:result.data});
            }.bind(this))
            .catch(function(error) {
               console.log(error);
         });

         axios.get('https://cdc-react.herokuapp.com/api/livros')
            .then(function(result) {
               this.setState({books:result.data});
            }.bind(this))
            .catch(function(error) {
               console.log(error);
         });

         PubSub.subscribe('book-list-updated', function(topic, newList) {
            this.setState({books: newList});
         }.bind(this));
   }

   render() {
      return (
         <div>
             <div className="header">
                <h1>Book's register</h1>
             </div>
             <div className="content" id="content">
                <BookForm authors={this.state.authors}/>
                <BookList books={this.state.books}/>
             </div>
         </div>
      );
   }
}

class BookForm extends Component {
   constructor() {
      super();
      this.state = {
         title: '',
         price: '',
         authorId: ''
      };

      this.sendForm = this.sendForm.bind(this);
      this.setTitle = this.setTitle.bind(this);
      this.setPrice = this.setPrice.bind(this);
      this.setAuthorId = this.setAuthorId.bind(this);
   }

   setTitle(event) {
      this.setState({title: event.target.value});
   }

   setPrice(event) {
      this.setState({price: event.target.value});
   }

   setAuthorId(event) {
      this.setState({authorId: event.target.value});
   }

   sendForm(event) {
      event.preventDefault();
      axios.post('https://cdc-react.herokuapp.com/api/livros', {
          titulo: this.state.title,
          preco:this.state.price,
          autorId:this.state.authorId
      })
      .then(function(result) {
          console.log("Sent");
          PubSub.publish('book-list-updated', result.data);
          this.setState({title: '', price: '', authorId: ''});
      }.bind(this))
      .catch(function(result) {
      });
   }

   render() {
      return (
         <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.sendForm}>
               <CustomInput id="title" type="text" name="title" value={this.state.title} onChange={this.setTitle} label="Title"/>
               <CustomInput id="price" type="text" name="price" value={this.state.price} onChange={this.setPrice} label="Price"/>
               <div className="pure-control-group">
                  <select value={this.state.authorId} name="authorId" onChange={this.setAuthorId}>
                     <option value="">Select</option>
                     {
                        this.props.authors.map(function(author) {
                           return (<option key={author.id} value={author.id}>{author.nome}</option>);
                        })
                     }
                  </select>
               </div>
               <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Send</button>
               </div>
            </form>
         </div>
      );
   }
}

class BookList extends Component {
   render() {
      return(
         <div>
            <table className="pure-table">
               <thead>
                  <tr>
                     <th>Title</th>
                     <th>Price</th>
                     <th>Author</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     this.props.books.map(function(book) {
                        return (
                           <tr key={book.id}>
                              <td>{book.titulo}</td>
                              <td>{book.preco}</td>
                              <td>{book.autor.nome}</td>
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