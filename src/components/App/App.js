import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import { connect } from 'react-redux';
import { HashRouter as Router, Route} from 'react-router-dom';

// Import Components
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support';
import Comments from '../Comments/Comments';
import Admin from '../Admin/Admin';

class App extends Component {


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




  render() {
    

    return (
      <Router>
        <div className="App">

          <Route exact path="/" component={Feeling} />
          <Route path="/2" component={Understanding} />
          <Route path="/3" component={Support} />
          <Route path="/4" component={Comments} />
          <Route path="/admin" component={Admin} />

        </div>
      </Router>
    );
  }
}

const mapStateToProps = reduxState => ({ reduxState });

export default connect(mapStateToProps)(App);
