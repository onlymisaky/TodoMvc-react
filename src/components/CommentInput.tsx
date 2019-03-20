import React, { Component } from 'react';
import { IComment } from './../types/index';

interface IProps {
  onSubmit?({ username, content }: IComment): void;
}

interface IState extends IComment {
}

class CommentInput extends Component<IProps, IState> {

  state = {
    username: '',
    content: '',
  }

  textarea!: HTMLTextAreaElement;

  componentWillMount() {
    this.loadUsername();
  }

  componentDidMount() {
    this.textarea.focus();
  }

  private saveUsername(username: string) {
    localStorage.setItem('username', username);
  }

  private loadUsername() {
    const username = localStorage.getItem('username') || '';
    this.setState({
      username
    });
  }

  handleBlurUsername(e: React.FormEvent) {
    this.saveUsername((e.target as HTMLInputElement).value);
  }

  handleChangeUsername(e: React.ChangeEvent) {
    this.setState({
      username: (e.target as HTMLInputElement).value
    });
  }

  handleChangeContent(e: React.ChangeEvent) {
    this.setState({
      content: (e.target as HTMLInputElement).value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({ username, content });
    }
    this.setState({
      content: ''
    });
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.username}
              onChange={this.handleChangeUsername.bind(this)}
              onBlur={this.handleBlurUsername.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content} onChange={(e) => this.handleChangeContent(e)}
              ref={(textarea: HTMLTextAreaElement) => this.textarea = textarea} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}
            disabled={!this.state.content.trim() || !this.state.username.trim()}>
            发布
          </button>
        </div>
      </div>
    );
  }

}

export default CommentInput;
