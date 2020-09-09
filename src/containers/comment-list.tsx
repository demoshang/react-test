import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';

import { CommentList } from '../components/comment-list';
import { CommentType, delComment, initComments } from '../reducers/comment';

class CommentListContainer extends Component<{
  comments: CommentType[];
  initComments: (comments: CommentType[]) => void;
  onDeleteComment: (index: number) => void;
}> {
  public componentWillMount() {
    this.loadComments();
  }

  public render() {
    return (
      <CommentList
        comments={this.props.comments}
        onDelete={this.handleDelete.bind(this)}
      ></CommentList>
    );
  }

  public handleDelete(index: number) {
    const { comments } = this.props;

    const newComments = [...comments];
    newComments.splice(index, 1);

    localStorage.setItem('comments', JSON.stringify(newComments));

    this.props.onDeleteComment(index);
  }

  private loadComments() {
    let comments = localStorage.getItem('comments');
    this.props.initComments(comments ? JSON.parse(comments) : []);
  }
}

export default connect(
  (state: { comments: CommentType[] }) => {
    return {
      comments: state.comments,
    };
  },
  (dispatch) => {
    return {
      initComments: (comments: CommentType[]) => {
        dispatch(initComments(comments));
      },
      onDeleteComment: (commentIndex: number) => {
        dispatch(delComment(commentIndex));
      },
    };
  }
)(CommentListContainer);
