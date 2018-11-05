import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';

class Success extends Component {

  // on click, reset form and direct back to page 1 of form
  handleClick = () => {
    // event.preventDefault();
    this.props.history.push('/');
    // this.clearFeedbackFields();
  }

//   clearFeedbackFields = () => {
//     this.setState(this.state);
//   }


  render() {

    let newFeedback = this.state;
    console.log('newFeedback from feeling:', newFeedback);
    

    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Feedback!</h1>
            <h4><i>Don't forget it!</i></h4>
        </header>
        <br/>

        <h1>Feedback Form</h1>
        <h2>Success!</h2>
        <h3>Your feedback has been submitted.</h3>
        <button onClick={this.handleClick}>Leave new feedback.</button>

        
      </div>
    );
  }
}


export default connect()(Success);