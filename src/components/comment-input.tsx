import React, { PureComponent } from 'react';

export class CommentInput extends PureComponent<
  {
    username?: string;
    onUsernameBlur?: (v: string) => void;
    onSubmit?: (v: { username: string; content: string; createdTime: number }) => void;
  }
> {
  state = {
    username: this.props.username ?? '',
    content: '',
  };

  textarea: HTMLTextAreaElement | null = null;

  public render() {
    return (
      <div>
        <div className="comment-field">
          <span className="comment-field-name">用户名</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              onBlur={this.handleUsernameBlur.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论</span>
          <div className="comment-field-input">
            <textarea
              ref={(textarea) => {
                this.textarea = textarea;
              }}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>

        <button onClick={this.handleSubmit.bind(this)}>发布</button>
      </div>
    );
  }

  public componentDidMount() {
    this.textarea?.focus();
  }

  public handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  public handleUsernameBlur(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onUsernameBlur?.(e.target.value);
  }

  public handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ content: e.target.value });
  }

  public handleSubmit() {
    this.props.onSubmit?.({
      username: this.state.username,
      content: this.state.content,
      createdTime: Date.now(),
    });

    this.setState({ content: '' });
  }
}
