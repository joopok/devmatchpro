import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../../common/Input';
import { Rating } from '../../../common/Rating';
import { Button } from '../../../common/Button';
import {
  FormContainer,
  FormTitle,
  RatingContainer,
  InputGroup,
  ErrorText,
} from './ReviewForm.styles';

interface ReviewFormData {
  rating: number;
  content: string;
}

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<ReviewFormData>;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: initialData?.rating || 0,
      content: initialData?.content || '',
    },
  });

  return (
    <FormContainer>
      <FormTitle>리뷰 작성</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RatingContainer>
          <Controller
            name="rating"
            control={control}
            rules={{ required: '평점을 선택해주세요' }}
            render={({ field: { onChange, value } }) => (
              <Rating
                value={value}
                onChange={onChange}
                size="large"
              />
            )}
          />
          {errors.rating && (
            <ErrorText>{errors.rating.message}</ErrorText>
          )}
        </RatingContainer>

        <InputGroup>
          <Input
            {...register('content', {
              required: '리뷰 내용을 입력해주세요',
              minLength: {
                value: 10,
                message: '최소 10자 이상 입력해주세요',
              },
            })}
            multiline
            rows={4}
            placeholder="리뷰 내용을 입력해주세요"
            error={!!errors.content}
            helperText={errors.content?.message}
          />
        </InputGroup>

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? '저장 중...' : '리뷰 작성하기'}
        </Button>
      </form>
    </FormContainer>
  );
}; 