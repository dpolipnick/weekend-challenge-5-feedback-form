import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';

class Comments extends Component {

  state ={
    comments: '',
  }



  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch( { type: 'ADD_COMMENTS', payload: this.state } )
    // this.clearFeedbackFields();
  }

//   clearFeedbackFields = () => {
//     this.setState(this.state);
//   }


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
          <button type="submit">Submit</button>
        </form>

        
      </div>
    );
  }
}


export default connect()(Comments);