import React, {Component} from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import CustomInput from './components/CustomInput';
import ErrorHandler from './ErrorHandler';

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

/*----------------------------------- Form -----------------------------------*/

class BookForm extends Component {
   constructor() {
      super();
      this.state = {
         title: '',
         price: '',
         authorId: ''
      };

      this.sendForm = this.sendForm.bind(this);
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
          var response = result.response.data;
          if (response.status === 400) {
              new ErrorHandler().publishErrors(response.errors);
          }
      });

      PubSub.publish('clear-error-msg');
   }

   setData(inputName, event) {
       this.setState({[inputName]: event.target.value});
   }

   render() {
      return (
         <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.sendForm}>
               <CustomInput id="title" type="text" name="title" value={this.state.title} onChange={this.setData.bind(this, 'title')} label="Title" ptname="titulo"/>
               <CustomInput id="price" type="text" name="price" value={this.state.price} onChange={this.setData.bind(this, 'price')} label="Price" ptname="preco"/>
               <div className="pure-control-group">
                   <label htmlFor="authorId">Author</label>
                  <select value={this.state.authorId} name="authorId" id="authorId" onChange={this.setData.bind(this, 'authorId')}>
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

/*----------------------------------- List -----------------------------------*/

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
