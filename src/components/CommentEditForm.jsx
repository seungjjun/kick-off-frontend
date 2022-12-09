import { useEffect, useState } from 'react';

import CommentModal from './CommentModal';

export default function CommentEditForm({
  commentId, initialContent, modifyComment, changeCommentEditState, close, setClose,
}) {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, []);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleClickModify = () => {
    if (content === '') {
      setClose(true);
      return;
    }

    modifyComment(content, commentId);
  };

  const handleClickCancel = () => {
    changeCommentEditState(0);
  };

  return (
    <form>
      <CommentModal
        close={close}
        setClose={setClose}
      />
      <input
        id="input-content"
        value={content}
        onChange={handleChangeContent}
      />
      <button type="button" onClick={handleClickModify}>수정완료</button>
      <button type="button" onClick={handleClickCancel}>취소</button>
    </form>
  );
}
