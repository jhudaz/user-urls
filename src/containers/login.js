import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { message, Button } from 'antd';


import { loginApi } from '../actions';
import { connect } from 'react-redux';

import '../App.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      token: 0
    }
    this.login = this.login.bind(this);
  }
  componentDidUpdate() {
    if (this.props.loginReducer.success) {
      this.props.history.push('/user-urls')
    }
  }
  login(e) {
    e.preventDefault();
    this.props.loginApi(this.state.email, this.state.pass);
  }
  render() {
    return (
      <form className="forms">
        <h2>E-mail</h2>
        <input
          className="inputs"
          type="email"
          placeholder="email"
          onChange={e => this.setState({ email: e.target.value })} />
        <h2>Password</h2>
        <input
          className="inputs"
          type="password"
          placeholder="password"
          onChange={e => this.setState({ pass: e.target.value })} />
        <div>
          <ul>
            <li>
              <button
                className="green"
                disabled={this.state.email.length === 0 || this.state.pass.length === 0}
                onClick={this.login}>Sign In</button>
            </li>
          </ul>
        </div>
      </form>
    );
  }
}
//reducers
function mapStateToProps({ loginReducer }) {
  return {
    loginReducer
  }
}
//actions
function mapDispatchToProps(dipsatch) {
  return bindActionCreators({
    loginApi
  }, dipsatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
