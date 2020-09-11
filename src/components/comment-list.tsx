import React from 'react';

import { CommentType } from '../reducers/comment';
import { Comment } from './comment';

export function CommentList({
  comments = [],
  onDelete,
}: {
  comments?: CommentType[];
  onDelete?: (index: number) => void;
}) {
  return (
    <div>
      {comments?.map((comment, index: number) => {
        return (
          <Comment
            key={`${comment}|${index}`}
            onDelete={() => {
              onDelete?.(index);
            }}
            index={index}
            comment={comment}
          ></Comment>
        );
      })}
    </div>
  );
}
