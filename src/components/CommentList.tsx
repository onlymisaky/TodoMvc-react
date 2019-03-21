import React from 'react';
import CommentListItem from "./CommentListItem";
import { IComment } from './../types/index';

interface IProps {
  comments: IComment[],
  onDeleteComment(index: number): void,
}

export default (props: IProps) => {
  return (
    <div>
      {props.comments.map((comment, i) =>
        <CommentListItem
          key={i}
          index={i}
          comment={comment}
          onDeleteComment={props.onDeleteComment} />
      )}
    </div>
  );
}
