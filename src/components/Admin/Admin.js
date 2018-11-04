import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class Admin extends Component {


    state = {
        feedbackList: [],
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


    deleteFeedback = (id) => {
      // call axios
      axios({
        method: 'DELETE',
        url: `/feedback/${id}`
      })
      .then( (response) => {
        console.log('Delete response:', response);
        this.getFeedback();
      })
      .catch( (error) => {
        alert('Error with deleting feedback:', error);
      })
    }
  


  render() {
    return (
      <div className="App">
      <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4><i>Don't forget it!</i></h4>
      </header>
      <br/>
          <h1>Admin Page</h1>
          <table>
            <thead>
              <tr> 
                <th>Feeling</th><th>Understanding</th><th>Support</th><th>Comments</th><th>Flagged</th><th>Date</th><th>Delete?</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.feedbackList.map( feedback => 
                <tr key={feedback.id}> 
                  <td>{feedback.feeling}</td><td>{feedback.understanding}</td>
                  <td>{feedback.support}</td><td>{feedback.comments}</td>
                  <td>{feedback.flagged}</td><td>{feedback.date}</td>
                  <td><button onClick={() => {this.deleteFeedback(feedback.id)}}>Delete?</button></td>
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

export default connect(mapStateToProps)(Admin);