enum COMMENT_ACTION {
  INIT = 'INIT',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export type CommentType = { username: string; content: string; createdTime: number };
export type State = { comments: CommentType[] };
export type Action =
  | { type: COMMENT_ACTION.INIT; comments: CommentType[] }
  | { type: COMMENT_ACTION.ADD; comment: CommentType }
  | { type: COMMENT_ACTION.DELETE; index: number };

export default function commentReducer(state: State = { comments: [] }, action: Action): State {
  switch (action.type) {
    case COMMENT_ACTION.INIT:
      return { comments: action.comments };
    case COMMENT_ACTION.ADD:
      return {
        comments: [...state.comments, action.comment],
      };
    case COMMENT_ACTION.DELETE:
      let comments = [...state.comments];
      comments.splice(action.index, 1);
      return {
        comments,
      };
    default:
      return state;
  }
}

function initComments(comments: CommentType[]) {
  return { type: COMMENT_ACTION.INIT, comments };
}

function addComment(comment: CommentType) {
  return { type: COMMENT_ACTION.ADD, comment };
}

function delComment(index: number) {
  return { type: COMMENT_ACTION.DELETE, index };
}

export { initComments, addComment, delComment };
