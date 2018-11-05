import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import axios from 'axios';

class Comments extends Component {

  state ={
    comments: '',
  }


  // change state from the input
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // handles the NEXT button
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch( { type: 'ADD_COMMENTS', payload: this.state.comments } );
    console.log('In comments submit- this.props.reduxState.feedbackReducer is:', this.props.reduxState.feedbackReducer);
    

    // POST request to send the reduxState to the database
    axios({
      method: 'POST',
      url: '/feedback',
      data: this.props.reduxState.feedbackReducer,
    })
    .then( (response) => {
      console.log('POST response was', response);
      this.props.history.push('/5');
    })
    .catch( (error) => {
      alert('Error with POST request:', error);
    })
  }


  // render the JSX
  render() {

    let newFeedback = this.state;
    console.log('newFeedback from comments:', newFeedback);
    

    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Feedback!</h1>
            <h4><i>Don't forget it!</i></h4>
        </header>
        <br/>

        <h1>Feedback Form</h1>
        <h2>Comments</h2>
        <form onSubmit={this.handleSubmit}>
          
          <label>Any comments you want to leave today?</label>
          <input onChange={this.handleChange} value={newFeedback.comments} name="comments" />
          <button type="submit">NEXT</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(Comments);