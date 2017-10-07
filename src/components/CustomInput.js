import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class CustomInput extends Component {

    constructor() {
        super();
        this.state = {errorMsg: ''}
    }

    componentWillMount() {
        PubSub.subscribe('form-error', function(topic, error) {
           if (error.field === this.props.name) {
             this.setState({errorMsg: error.defaultMessage});
           }
        }.bind(this));
    }

    render() {
        return(
            <div className="pure-control-group">
               <label htmlFor={this.props.id}>{this.props.label}</label>
               <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
               <span className="errors">{this.state.errorMsg}</span>
            </div>
        );
    }
}
