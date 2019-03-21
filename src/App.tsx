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

  componentWillMount() {
    this.loadComments();
  }

  private saveComments(comments: IComment[]) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  private loadComments() {
    let comments: IComment[] | string | null = localStorage.getItem('comments');
    if (comments) {
      comments = (JSON.parse(comments) as IComment[]);
      this.setState({ comments })
    }
  }

  handleSubmitComment(comment: IComment) {
    const comments: IComment[] = [...this.state.comments];
    comments.push(comment);
    this.setState({ comments });
    this.saveComments(comments);
  }

  handleDeleteComment(index: number) {
    const comments: IComment[] = [...this.state.comments];
    comments.splice(index, 1);
    this.setState({ comments });
    this.saveComments(comments);
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)} />
      </div>
    );
  }
}

export default CommentApp;
