/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Container = styled.div`
    margin: 1em 0;
    padding: 1em;
    border: 1px solid #CCC;
`;

const Search = styled.form`
    text-align: center;
`;

const Select = styled.select`
    margin-right: 1em;
    padding: 0.3em 0.2em;
    border: 1px solid #CCC;
`;

const Input = styled.input`
  width: 50%;
  padding: 0.3em 1em;
  border: 1px solid #CCC;
`;

const SearchButton = styled.button`
    margin-left: 1em;
    padding: 0.3em 1em;
`;

export default function SearchForm({ submit, changeKeywordType }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    submit(data);
  };

  const handleChange = (target) => {
    changeKeywordType(target.target.value);
  };

  return (
    <Container>
      <Search onSubmit={handleSubmit(onSubmit)}>
        <Select
          id="select-keywordType"
          onChange={handleChange}
        >
          <option value="title">
            제목만
          </option>
          <option value="content">
            내용만
          </option>
          <option value="author">
            닉네임
          </option>
        </Select>
        <Input
          id="input-keyword"
          type="text"
          placeholder="검색어를 입력해주세요"
          {...register('keyword')}
        />
        <SearchButton type="submit">검색</SearchButton>
      </Search>
    </Container>
  );
}
