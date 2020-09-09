import { PureComponent } from 'react';
import React from 'react';

import { CommentType } from '../reducers/comment';
import { Comment } from './comment';

export class CommentList extends PureComponent<{
  comments?: CommentType[];
  onDelete?: (index: number) => void;
}> {
  static defaultProps = { comments: [] };

  handleDelete(index: number) {
    this.props.onDelete?.(index);
  }

  render() {
    return (
      <div>
        {this.props.comments?.map((comment, index: number) => {
          return (
            <Comment
              key={index}
              onDelete={this.handleDelete.bind(this)}
              index={index}
              comment={comment}
            ></Comment>
          );
        })}
      </div>
    );
  }
}
