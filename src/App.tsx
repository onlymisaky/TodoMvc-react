import React, { Component } from 'react';
import CommentInput from './components/CommentInput';
import CommentList from './components/CommentList';
import { IComment } from './types/index';

interface IState {
  comments: IComment[]
}

class CommentApp extends Component<{}, IState> {

  state = {
    comments: []
  }

  handleSubmitComment(comment: IComment) {
    const comments: IComment[] = JSON.parse(JSON.stringify(this.state.comments));
    comments.push(comment);
    this.setState({
      comments: comments
    })
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentApp;
