import React, { useEffect, useState } from 'react';

import { CommentType } from '../reducers/comment';

function getProcessedContent(content: string) {
  return content.replace(/`([^`]+?)`/, '<code>$1</code>');
}

function formatDate(when: number) {
  const seconds = Math.round((Date.now() - when) / 1000);

  if (seconds < 60) {
    return `${seconds}秒前`;
  }

  return `${Math.round(seconds / 60)}分钟前`;
}

export function Comment({
  comment,
  onDelete,
  index,
}: {
  comment: CommentType;
  index: number;
  onDelete?: (index: number) => void;
}) {
  const [time, setTime] = useState(formatDate(comment.createdTime));

  useEffect(() => {
    console.info('处理时间显示', comment);
    setTime(formatDate(comment.createdTime));
    
    const timer = setInterval(() => {
      setTime(formatDate(comment.createdTime));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [comment]);

  return (
    <div>
      <span>{comment.username}:</span>

      <p dangerouslySetInnerHTML={{ __html: getProcessedContent(comment.content) }}></p>
      <br />
      <span>{time}</span>

      <button
        onClick={() => {
          return onDelete?.(index);
        }}
      >
        删除
      </button>
    </div>
  );
}

