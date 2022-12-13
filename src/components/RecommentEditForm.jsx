import { useEffect, useState } from 'react';

import styled from 'styled-components';

const Form = styled.form`
  button {
    margin-left: .7em;
    background-color: #FFF;
    color: #979797;
  }
`;

export default function RecommentEditForm({
  recommentId, initialContent, modifyRecomment, changeRecommentEditState,
}) {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, []);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleClickModify = () => {
    modifyRecomment(content, recommentId);
  };

  const handleClickCancel = () => {
    changeRecommentEditState(0);
  };

  return (
    <Form>
      <input
        id="input-content"
        value={content}
        onChange={handleChangeContent}
      />
      <button type="button" onClick={handleClickModify}>수정완료</button>
      <button type="button" onClick={handleClickCancel}>취소</button>
    </Form>
  );
}
