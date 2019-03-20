import React from 'react';
import CommentListItem from "./CommentListItem";
import { IComment } from './../types/index';

interface IProps {
  comments: IComment[];
}

export default (props: IProps) => {
  return (
    <div>
      {props.comments.map((comment, i) => <CommentListItem comment={comment} key={i} />)}
    </div>
  );
}
