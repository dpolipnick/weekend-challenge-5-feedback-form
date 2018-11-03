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

  render() {
    return (
      <div>
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

export default connect(mapStateToProps)(Admin);