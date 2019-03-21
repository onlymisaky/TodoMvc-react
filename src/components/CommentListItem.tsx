import React from 'react';
import { IComment } from './../types/index';
import { formatDate, transformContent } from './../utils/index';

interface IProps {
  comment: IComment,
  onDeleteComment?(index: number): void,
  index: number
}

export default class CommentListItem extends React.Component<IProps, { time: string | number }> {

  state = {
    time: ""
  };

  private timer!: number;

  componentWillMount() {
    this.updateTime();
    this.timer = window.setInterval(() => {
      this.updateTime()
    }, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  private updateTime() {
    const time = this.props.comment.createdTime ? formatDate(this.props.comment.createdTime) : '';
    this.setState({ time });
  }

  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  render() {
    return (
      <div className='comment'>
        <div className='comment-username'>
          <span>{this.props.comment.username} </span>：
      </div>
        <p dangerouslySetInnerHTML={{ __html: transformContent(this.props.comment.content) }}></p>
        <span className='comment-createdtime'>
          {this.state.time}
        </span>
        <span className='comment-delete' onClick={this.handleDeleteComment.bind(this)}>
          删除
        </span>
      </div>
    );
  }

}
