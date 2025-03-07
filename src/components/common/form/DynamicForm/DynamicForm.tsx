import React, { useState } from 'react';
import { Input } from '../../Input';
import { Select } from '../../Select';
import { Checkbox } from '../../Checkbox';
import { Button } from '../../Button';
import { DatePicker } from '../../DatePicker';
import { TextArea } from '../../TextArea';
import {
  FormContainer,
  FormSection,
  InputGroup,
  ValidationMessage,
  FormActions,
} from './DynamicForm.styles';
import { useForm } from 'react-hook-form';

interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
}

interface FormField {
  id: string;
  type: 'text' | 'number' | 'email' | 'select' | 'checkbox' | 'date' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    min?: number;
    max?: number;
  };
  options?: Array<{ value: string; label: string }>;
  disabled?: boolean;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  onCancel?: () => void;
  initialValues?: Record<string, any>;
  isLoading?: boolean;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  onCancel,
  initialValues = {},
  isLoading,
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { control } = useForm();

  const validateField = (field: FormField, value: any): string | undefined => {
    if (!field.validation) return undefined;

    if (field.validation.required && !value) {
      return '이 필드는 필수입니다';
    }

    if (field.validation.min && value < field.validation.min) {
      return `${field.validation.min}보다 커야 합니다`;
    }

    if (field.validation.max && value > field.validation.max) {
      return `${field.validation.max}보다 작아야 합니다`;
    }

    if (field.validation.minLength && value.length < field.validation.minLength) {
      return `최소 ${field.validation.minLength}자 이상이어야 합니다`;
    }

    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      return `최대 ${field.validation.maxLength}자까지 가능합니다`;
    }

    if (field.validation.pattern && !field.validation.pattern.test(value)) {
      return '올바른 형식이 아닙니다';
    }

    return undefined;
  };

  const handleChange = (field: FormField, value: any) => {
    setValues((prev) => ({ ...prev, [field.id]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field.id]: error || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach((field) => {
      const error = validateField(field, values[field.id]);
      if (error) {
        newErrors[field.id] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      label: field.label,
      value: values[field.id] || '',
      onChange: (e: any) =>
        handleChange(
          field,
          field.type === 'checkbox' ? e.target.checked : e.target.value
        ),
      error: !!errors[field.id],
      helperText: errors[field.id],
      disabled: isLoading,
      required: field.required,
    };

    switch (field.type) {
      case 'select':
        return (
          <Select {...commonProps} options={field.options || []} />
        );
      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            checked={values[field.id] || false}
            onChange={(checked: boolean) => handleChange(field, checked)}
          />
        );
      case 'date':
        return (
          <DatePicker
            {...commonProps}
            control={control}
            name={field.id}
            rules={{ required: field.required }}
          />
        );
      case 'textarea':
        return (
          <TextArea
            {...commonProps}
            rows={4}
            placeholder={field.placeholder}
          />
        );
      default:
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormSection>
        {fields.map((field) => (
          <InputGroup key={field.id}>
            {renderField(field)}
            {errors[field.id] && (
              <ValidationMessage $error>{errors[field.id]}</ValidationMessage>
            )}
          </InputGroup>
        ))}
      </FormSection>

      <FormActions>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            취소
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          저장
        </Button>
      </FormActions>
    </FormContainer>
  );
}; 