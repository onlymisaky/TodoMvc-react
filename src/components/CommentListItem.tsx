import React from 'react';
import { IComment } from './../types/index';

interface IProps {
  comment: IComment
}

export default (props: IProps) => {
  return (
    <div className='comment'>
      <div className='comment-user'>
        <span>{props.comment.username} </span>：
    </div>
      <p>{props.comment.content}</p>
    </div>
  );
};
