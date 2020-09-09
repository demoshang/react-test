import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CommentInput } from '../components/comment-input';
import { addComment, CommentType } from '../reducers/comment';

export class CommentInputContainer extends Component<{
  comments: CommentType[];
  onSubmit: (comment: CommentType) => void;
}> {
  state = {
    username: '',
  };

  componentWillMount() {
    this.loadUsername();
  }

  render() {
    return (
      <CommentInput
        username={this.state.username}
        onUsernameBlur={this.handleUsernameBlur.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)}
      />
    );
  }

  handleUsernameBlur(username: string) {
    localStorage.setItem('username', username);
  }

  handleSubmitComment(comment: CommentType) {
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名');
    if (!comment.content) return alert('请输入评论内容');
    const { comments } = this.props;
    const newComments = [...comments, comment];
    localStorage.setItem('comments', JSON.stringify(newComments));
    if (this.props.onSubmit) {
      this.props.onSubmit(comment);
    }
  }

  private loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }
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
      onSubmit: (comment: CommentType) => {
        dispatch(addComment(comment));
      },
    };
  }
)(CommentInputContainer);
