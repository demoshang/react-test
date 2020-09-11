import React, { useEffect, useState } from 'react';

export function CommentInput({
  username: inputUsername,
  onUsernameBlur,
  onSubmit,
}: {
  username?: string;
  onUsernameBlur?: (v: string) => void;
  onSubmit?: (v: { username: string; content: string; createdTime: number }) => void;
}) {
  const [username, setUsername] = useState(inputUsername ?? '');
  const [content, setContent] = useState('');

  const [textarea, setTextarea] = useState<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textarea?.focus();
  }, [textarea]);

  const handleUsernameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onUsernameBlur?.(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit?.({
      username: username,
      content: content,
      createdTime: Date.now(),
    });

    setContent('');
  };

  return (
    <div>
      <div className="comment-field">
        <span className="comment-field-name">用户名</span>
        <div className="comment-field-input">
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={handleUsernameBlur}
          />
        </div>
      </div>
      <div className="comment-field">
        <span className="comment-field-name">评论</span>
        <div className="comment-field-input">
          <textarea
            ref={(ele) => {
              setTextarea(ele);
            }}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      </div>

      <button onClick={handleSubmit}>发布</button>
    </div>
  );
}
