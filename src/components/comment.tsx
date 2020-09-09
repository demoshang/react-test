import React, { PureComponent } from 'react';

import { CommentType } from '../reducers/comment';

export class Comment extends PureComponent<{
  comment: CommentType;
  index: number;
  onDelete?: (index: number) => void;
}> {
  state = {
    time: Comment.formatDate(this.props.comment.createdTime),
  };

  timer: any = null;

  static formatDate(when: number) {
    const seconds = Math.round((Date.now() - when) / 1000);

    if (seconds < 60) {
      return `${seconds}秒前`;
    }

    return `${Math.round(seconds / 60)}分钟前`;
  }

  static getProcessedContent(content: string) {
    return content.replace(/`([^`]+?)`/, '<code>$1</code>');
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: Comment.formatDate(this.props.comment.createdTime),
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleDelete() {
    this.props.onDelete?.(this.props.index);
  }

  render() {
    const { comment } = this.props;

    return (
      <div>
        <span>{comment.username}:</span>

        <p dangerouslySetInnerHTML={{ __html: Comment.getProcessedContent(comment.content) }}></p>
        <br />
        <span>{this.state.time}</span>

        <button onClick={this.handleDelete.bind(this)}>删除</button>
      </div>
    );
  }
}
