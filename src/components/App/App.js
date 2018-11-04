import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux';
import Understanding from '../Understanding/Understanding';

class App extends Component {

  state ={
    feeling: '',
    understanding: '',
    support: '',
    comments: '',
    flagged: '',
    date: '',
  }


  // getSongs = () => {
  //   axios({
  //     method: 'POST',
  //     url: '/songs',
  //     data: ''
  //   })
  //   .then( (response) => {
  //     console.log('Response was', response.data );
  //     // Put the response into state, so that we will trigger render() 
  //     this.setState({
  //       songList: response.data 
  //     })
  //   })
  //   .catch( (error) => {
  //     alert('Error', error);
  //   })
  // }



  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch( { type: 'ADD_FEEDBACK', payload: this.state } )
    this.clearFeedbackFields();
  }

  clearFeedbackFields = () => {
    this.setState(this.state);
  }


  render() {

    let newFeedback = this.state;
    console.log('newFeedback:', newFeedback);
    

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4><i>Don't forget it!</i></h4>
        </header>
        <br/>


        <h1>Feedback Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>How are you feeling today?</label>
          <input onChange={this.handleChange} value={newFeedback.feeling} name="feeling" />
          <label>How well are you understanding the content?</label>
          <input onChange={this.handleChange} value={newFeedback.understanding} name="understanding" />
          <label>How well are you being supported?</label>
          <input onChange={this.handleChange} value={newFeedback.support} name="support" />
          <label>Any comments you want to leave today?</label>
          <input onChange={this.handleChange} value={newFeedback.comments} name="comments" />
          <button type="submit">Submit</button>
        </form>

        
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(App);
