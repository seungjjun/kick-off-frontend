/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;

  h2 {
    font-size: 1.6em;
    font-weight: bold;
    padding-bottom: .6em;
    border-bottom: 1px solid #CCC;
  }

  p:first-child {
    font-size: 1.2em;
    margin-block: 1em;
  }
`;

const Form = styled.form`
  margin-block: 2em;
  text-align: end;

  select {
    padding: .3em 1em;
    border: 1px solid #CCC;
  }

  input {
    margin: 0 .7em;
    padding: .35em 1em;
    border: 1px solid #CCC;
  }

  button {
    padding: .45em 1em;
  }
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  width: 100%;
  border-bottom: 1px solid #CCC;

  td {
    align-self: center;
  }

  th {
    align-self: center;
  }
`;

const Thead = styled.thead`
  display: flex;
  height: 3em;
  background-color: #F5F5F5;
`;

const Tr = styled.tr`
  display: flex;
  width: 100%;
`;

const Nothing = styled.tr`
  display: flex;
  justify-content: center;
  margin-block: 2em;
  color: #CCC;
`;

const Values = styled.tr`
  display: flex;
  justify-content: space-between;
  margin-block: 1em;
  width: 100%;

  td {
    text-align: center;
  }
`;

const NickName = styled.th`
  width: 30%;
`;

const NickNameValue = styled.th`
  width: 30%;
`;

const ApplicationGrade = styled.th`
  width: 25%;
`;

const ApplicationGradeValue = styled.td`
  width: 25%;
`;

const CurrentGrade = styled.th`
  width: 25%;
`;

const CurrentGradeValue = styled.td`
  width: 25%;
`;

const State = styled.th`
  width: 20%;
`;

const StateValue = styled.td`
  width: 20%;
`;

const Success = styled.p`
  margin-block: 1em;
`;

const Error = styled.p`
  margin-block: 1em;
  color: #E51919;
`;

export default function LevelUpBoard({
  submit, changeGrade, errorMessages, applicationPosts,
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const handleChangeGrade = (target) => {
    changeGrade(target.target.value);
  };

  const onSubmit = (data) => {
    submit(data);
  };

  return (
    <Container>
      <h2>?????? ?????????</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <select
          id="select-grade"
          onChange={handleChangeGrade}
        >
          <option value="">?????? ????????? ??????????????????</option>
          <option value="????????????">????????????</option>
          <option value="??????">??????</option>
          <option value="???????????????">???????????????</option>
        </select>
        <input
          id="input-reason"
          type="text"
          placeholder="?????? ????????? ??????????????????"
          {...register('reason', {
            required: { value: true, message: '?????? ????????? ??????????????????' },
          })}
        />
        {errors.reason ? (
          <Error>{errors.reason.message}</Error>
        ) : errorMessages.isExistingUser ? (
          <Error>{errorMessages.applicationErrorMessge}</Error>
        ) : errorMessages.isSelectGrade ? (
          <Error>{errorMessages.applicationErrorMessge}</Error>
        ) : errorMessages.isApplicationSuccess ? (
          <Success>{errorMessages.applicationErrorMessge}</Success>
        ) : null}
        <button type="submit">????????????</button>
      </Form>
      <div>
        <p>?????? ????????????</p>
        <Table>
          <Thead>
            <Tr>
              <NickName>?????????</NickName>
              <CurrentGrade>?????? ??????</CurrentGrade>
              <ApplicationGrade>?????? ??????</ApplicationGrade>
              <State>?????? ??????</State>
            </Tr>
          </Thead>
          <tbody>
            {applicationPosts.length === 0 ? (
              <Nothing>
                <td>
                  ?????? ????????? ????????????.
                </td>
              </Nothing>
            ) : (
              applicationPosts.map((post) => (
                <Values key={post.id}>
                  <NickNameValue>{post.applicant.name}</NickNameValue>
                  <CurrentGradeValue>{post.applicant.currentGrade}</CurrentGradeValue>
                  <ApplicationGradeValue>{post.applicant.applicationGrade}</ApplicationGradeValue>
                  {post.state === 'processing' ? (
                    <StateValue>?????????</StateValue>
                  ) : post.state === 'success' ? (
                    <StateValue>????????????</StateValue>
                  ) : post.state === 'refuse' ? (
                    <StateValue>?????????</StateValue>
                  ) : null}
                </Values>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
