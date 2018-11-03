import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  state={
    feedbackList: [],
    newFeedback: {
      feeling: '',
      understanding: '',
      support: '',
      comments: '',
      flagged: '',
      date: '',
    }
  }

  // componentDidMount calls the function right away during load
  componentDidMount() {
    this.getFeedback();
  }

  getFeedback = () => {
    axios.get('/feedback')
      .then( (response) => {
        console.log('Response was:', response);
        // put the feedback into state so we can use it on the DOM
        this.setState({
          feedbackList: response.data
        })
      })
      .catch( (error) => {
        alert('Error with GET request:', error);
      })
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
      // newFeedback = {
        [event.target.name]: event.target.value,
      // }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch( { type: 'ADD_FEEDBACK', payload: this.state.newFeedback } )
    this.clearFeedbackFields();
  }

  clearFeedbackFields = () => {
    // this.setState(this.state.newFeedback);
  }


  render() {

    let newFeedback = this.state.newFeedback;
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




        <h1>Admin Page</h1>
          <table>
            <thead>
              <tr> 
                <th>Feeling</th><th>Understanding</th><th>Support</th><th>Comments</th><th>Flagged</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.feedbackList.map( feedback => 
                <tr key={feedback.id}> 
                  <td>{feedback.feeling}</td><td>{feedback.understanding}</td>
                  <td>{feedback.support}</td><td>{feedback.comments}</td>
                  <td>{feedback.flagged}</td><td>{feedback.date}</td>
                </tr>
              )
            }
          </tbody>
          </table>

        
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(App);
