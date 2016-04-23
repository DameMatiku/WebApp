import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initVoting, upvote, downvote, resetVote } from '../../reducers/voting/actionCreators';

import FlatButton from 'material-ui/FlatButton';

class Voting extends Component {

  componentWillMount = () => {
    const { video, init } = this.props;
    !!video && init();
  };

  componentWillReceiveProps = (newProps) => {
    if (!!this.props.video
        && !!newProps.video
        && this.props.video.id !== newProps.video.id) {
      newProps.init();
    }
  };

  onVoteUp = () => {
    const { vote, resetVote, upvote, accessToken } = this.props;
    vote === 'UP' ? resetVote(accessToken) : upvote(accessToken);
  };

  onVoteDown = () => {
    const { vote, resetVote, downvote, accessToken } = this.props;
    vote === 'DOWN' ? resetVote(accessToken) : downvote(accessToken);
  };

  render() {
    const { accessToken, score, vote } = this.props;
    return (
      <div style={{ textAlign: 'right' }}>
        <FlatButton label={'Plus'} onMouseUp={this.onVoteUp} onTouchStop={this.onVoteUp} primary={vote === 'UP'} disabled={accessToken === null && false} />
        <b style={{ marginLeft: 10, marginRight: 10 }}>{score}</b>
        <FlatButton label={'Mínus'} onMouseUp={this.onVoteDown} onTouchStop={this.onVoteDown} primary={vote === 'DOWN'} disabled={accessToken === null && false} />
      </div>
    );
  }

}

const mapStateToProps = (state, props) => ({
  accessToken: state.authentication.accessToken,
  voting: state.voting[props.video.id],
  vote: !!state.voting[props.video.id] ? state.voting[props.video.id].vote : null,
  score: Number(props.video.votes)
});

const mapDispatchToProps = (dispatch, props) => ({
  init: () => dispatch(initVoting(props.video)),
  upvote: (accessToken) => dispatch(upvote(accessToken, props.video.id)),
  downvote: (accessToken) => dispatch(downvote(accessToken, props.video.id)),
  resetVote: (accessToken) => dispatch(resetVote(accessToken, props.video.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Voting);
