import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';

class Feeling extends Component {

  state ={
    feeling: '',
  }


  // handles the input change and sets state
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  // handles the NEXT button to send local state to the reduxState
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch( { type: 'ADD_FEELING', payload: this.state.feeling } );
    this.props.history.push('/2');
    // this.clearFeedbackFields();
  }



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
        <h2>Feeling</h2>
        <form onSubmit={this.handleSubmit}>
          <label>How are you feeling today?</label>
          <input onChange={this.handleChange} value={newFeedback.feeling} name="feeling" type="number"/>
          
          <button type="submit">NEXT</button>
        </form>

        
      </div>
    );
  }
}


export default connect()(Feeling);