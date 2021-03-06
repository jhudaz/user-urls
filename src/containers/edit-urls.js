import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { message } from 'antd';

import { newUrl, getUrl, updateUrl } from '../actions';

import '../App.scss';

class EditUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      score: 0,
      urlId: ''
    }
    this.cancelButton = this.cancelButton.bind(this);
    this.prevent = this.prevent.bind(this);
    this.score = this.score.bind(this);
  }
  componentDidMount() {
    console.log('que tiene:', this.props.match.params.urlId)
    if (this.props.match.params.urlId !== undefined) {
      this.props.getUrl(this.props.match.params.urlId).then(() => {
        this.setState({
          urlId: this.props.match.params.urlId,
          url: this.props.loginReducer.urlData.url,
          score: this.props.loginReducer.urlData.score
        })
      })

    } else {
      this.setState({
        url: '',
        score: 0
      })
    }
  }
  //PREVENT
  prevent(e) {
    e.preventDefault();
  }
  //SAVE
  saveButton(e) {
    this.prevent(e);
    this.props.newUrl(
      this.state.url,
      this.props.loginReducer.user.id,
      this.state.score
    );
    this.props.history.push('/user-urls');
  }
  //EDIT
  editButton(e) {
    this.prevent(e);
    //console.log("states",this.state.urlId,this.state.url,this.state.score,this.props.loginReducer.user.id)
    this.props.updateUrl(
      this.state.urlId,
      this.state.url,
      this.state.score,
      this.props.loginReducer.user.id
    )
    this.props.history.push('/user-urls');
  }
  //CANCEL
  cancelButton(e) {
    this.prevent(e);
    this.setState({
      url: '',
      score: 0
    })
    this.props.history.push('/user-urls');
  }
  //to manage the score input
  score(e) {
    if (e.target.value !== '') {
      let score = e.target.value;

      this.setState({ score: score }, () => {
        if (this.state.score < 1 || this.state.score > 5) {
          message.error(`Type a  score between 1 and 5, your value "${score}" is invalid`);
        }
      });
    } else {
      this.setState({ score: '' });
    }
  }

  render() {
    return (
      <form className="forms">
        <h2>Url</h2>
        <input
          className="inputs"
          type="text"
          onChange={e => this.setState({ url: e.target.value })}
          value={this.state.url} />
        <h2>Score</h2>
        <input
          className="inputs"
          type="number"
          min={1}
          max={5}
          onChange={e => this.score(e)}
          value={this.state.score} />

        <br />
        {/* SAVE BUTTON IF ITS A NEW URL */}
        {this.state.urlId === '' &&
          <button
            className="green"
            onClick={e => this.saveButton(e)}
            disabled={this.state.url.length === 0 || this.state.score > 5 || this.state.score < 1}>Save
          </button>
        }
        {/* EDIT BUTTON IF URL EXIST */}
        {this.state.urlId !== '' &&
          <button
            className="green"
            onClick={e => this.editButton(e)}
            disabled={this.state.url.length === 0 || this.state.score > 5 || this.state.score < 1}>Edit
          </button>
        }
        <button
          className="red"
          onClick={e => this.cancelButton(e)}>
          Cancel
        </button>
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
    newUrl,
    getUrl,
    updateUrl
  }, dipsatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUrl));