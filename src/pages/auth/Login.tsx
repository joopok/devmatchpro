import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/common/Button';
import { TextField } from '../../components/common/TextField';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="이메일"
        {...register('email', { required: '이메일을 입력하세요' })}
        error={errors.email?.message}
      />
      <TextField
        label="비밀번호"
        type="password"
        {...register('password', { required: '비밀번호를 입력하세요' })}
        error={errors.password?.message}
      />
      <Button type="submit">로그인</Button>
    </form>
  );
};

export default Login; 