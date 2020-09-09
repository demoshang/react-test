import { Component } from 'react';
import React from 'react';

import CommentInput from './comment-input';
import CommentList from './comment-list';

export class CommentApp extends Component {
  render() {
    return (
      <div className="wrapper">
        <CommentInput />
        <CommentList />
      </div>
    );
  }
}
