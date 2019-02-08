import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from './containers/login';
import UserUrl from './containers/user-urls';
import EditUrl from './containers/edit-urls';
import Callback from './Callback/Callback';
import Auth from './services/Auth';
import history from './history';
import { setToken } from './actions';
import './App.scss';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

  render() {
    return (
      <Router history={history} >
        <div className="login">
          <div className="header"></div>
          <div className="box">
            <div className="row">
              <div className="aside"></div>
              <div className="content"></div>
              <div className="aside"></div>
            </div>
          </div>
          <Route exact path="/" component={Login} />
          <Route path="/user-urls" component={UserUrl} />
          <Route path="/edit-urls/:urlId" component={EditUrl} />
          <Route path="/create-url" component={EditUrl} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />
        </div>


      </Router>
    );
  }
}
function mapStateToProps({ loginReducer }) {
  return {
    loginReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setToken
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
