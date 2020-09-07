import React, { Component, Ref } from 'react';
import './App.css';

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { list: [] };
  }

  componentWillMount() {
    try {
      const o = JSON.parse(localStorage.getItem('list') || '[]');
      this.setState({ list: o });
    } catch (e) {
      console.warn(e);
    }
  }

  submit(v: any) {
    const list = [v, ...this.state.list];
    this.setState({ list });

    localStorage.setItem('list', JSON.stringify(list));
  }

  rm(index: number) {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({ list });

    localStorage.setItem('list', JSON.stringify(list));
  }

  render() {
    return (
      <div>
        <CommentInput submit={this.submit.bind(this)}></CommentInput>
        <CommentList rm={this.rm.bind(this)} list={this.state.list}></CommentList>
      </div>
    );
  }
}

class CommentInput extends Component<any, any> {
  contentRef: HTMLTextAreaElement | null = null;

  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      content: '',
    };
  }

  componentWillMount() {
    this.setState({ username: localStorage.getItem('username') });
  }

  componentDidMount() {
    this.contentRef?.focus();
  }

  usernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  usernameBlur(e: React.ChangeEvent<HTMLInputElement>) {
    localStorage.setItem('username', e.target.value);
  }

  contentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ content: e.target.value });
  }

  submit() {
    const { username, content } = this.state;
    this.props.submit({ username, content, when: Date.now() });

    this.setState({ content: '' });
  }

  render() {
    return (
      <div>
        <div className="comment-field">
          <span className="comment-field-name">用户名</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.usernameChange.bind(this)}
              onBlur={this.usernameBlur.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论</span>
          <div className="comment-field-input">
            <textarea
              ref={(contentRef) => {
                this.contentRef = contentRef;
              }}
              value={this.state.content}
              onChange={this.contentChange.bind(this)}
            />
          </div>
        </div>

        <button onClick={this.submit.bind(this)}>发布</button>
      </div>
    );
  }
}

class CommentList extends Component<any, { list: any[] }> {
  rm(index: number) {
    this.props.rm(index);
  }

  render() {
    return (
      <div>
        {this.props.list.map((comment: any, index: number) => {
          return (
            <Comment key={index} rm={this.props.rm.bind(this, index)} comment={comment}></Comment>
          );
        })}
      </div>
    );
  }
}

class Comment extends Component<{ comment: any; rm: Function }, any> {
  timer: any;

  constructor(props: any) {
    super(props);

    this.state = {
      time: this.formatDate(this.props.comment.when),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: this.formatDate(this.props.comment.when),
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatDate(when: number) {
    const seconds = Math.round((Date.now() - when) / 1000);

    if (seconds < 60) {
      return `${seconds}秒前`;
    }

    return `${Math.round(seconds / 60)}分钟前`;
  }

  rm(comment: any) {
    this.props.rm(comment);
  }

  private getProcessedContent(content: string) {
    return content.replace(/`([^`]+?)`/, '<code>$1</code>');
  }

  render() {
    const { comment } = this.props;
    return (
      <div>
        <span>{comment.username}:</span>

        <p dangerouslySetInnerHTML={{ __html: this.getProcessedContent(comment.content) }}></p>
        <br />
        <span>{this.state.time}</span>

        <button onClick={this.rm.bind(this, comment)}>删除</button>
      </div>
    );
  }
}

export default App;
