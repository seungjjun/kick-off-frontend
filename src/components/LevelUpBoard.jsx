/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';

export default function LevelUpBoard({
  submit, changeGrade, isExistingUser, applicationErrorMessge,
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const handleChangeGrade = (target) => {
    changeGrade(target.target.value);
  };

  const onSubmit = (data) => {
    submit(data);
  };

  return (
    <div>
      <h2>등업 게시판</h2>
      <div>
        <p>등업 신청현황</p>

      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          id="select-grade"
          onChange={handleChangeGrade}
        >
          <option value="">신청 등급을 선택해주세요</option>
          <option value="세미프로">세미프로</option>
          <option value="프로">프로</option>
          <option value="월드클래스">월드클래스</option>
        </select>
        <input
          id="input-reason"
          type="text"
          placeholder="신청 사유를 입력해주세요"
          {...register('reason', {
            required: { value: true, message: '신청 사유를 입력해주세요' },
          })}
        />
        {errors.reason ? (
          <p>{errors.reason.message}</p>
        ) : isExistingUser ? (
          <p>{applicationErrorMessge}</p>
        ) : null}
        <button type="submit">등업신청</button>
      </form>
    </div>
  );
}
