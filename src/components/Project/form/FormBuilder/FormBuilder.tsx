import React, { useState } from 'react';
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { Card } from '../../../common/Card';
import { Checkbox } from '../../../common/Checkbox';
import { TextArea } from '../../../common/TextArea';
import {
  StyledBuilderContainer as ImportedBuilderContainer,
  FieldPalette,
  FormPreview,
  FieldEditor,
  ToolbarSection,
  StyledFieldsContainer as ImportedFieldsContainer,
  StyledFormField as ImportedFormField,
} from './FormBuilder.styles';
import styled from 'styled-components';
import { DragDropWrapper, DroppableWrapper, DraggableWrapper } from '../../../common/DragDropWrapper';

interface FieldConfig {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
}

interface FormConfig {
  title: string;
  description?: string;
  fields: FieldConfig[];
}

interface FormBuilderProps {
  initialConfig?: FormConfig;
  onSave: (config: FormConfig) => Promise<void>;
  isLoading?: boolean;
}

const FIELD_TYPES = [
  { value: 'text', label: '텍스트' },
  { value: 'number', label: '숫자' },
  { value: 'email', label: '이메일' },
  { value: 'select', label: '선택' },
  { value: 'checkbox', label: '체크박스' },
  { value: 'date', label: '날짜' },
  { value: 'textarea', label: '텍스트 영역' },
];

export const FormBuilder: React.FC<FormBuilderProps> = ({
  initialConfig = { title: '', fields: [] },
  onSave,
  isLoading,
}) => {
  const [config, setConfig] = useState<FormConfig>(initialConfig);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [showFieldEditor, setShowFieldEditor] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const fields = Array.from(config.fields);
    const [removed] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, removed);

    setConfig({ ...config, fields });
  };

  const addField = (type: string) => {
    const newField: FieldConfig = {
      id: `field_${Date.now()}`,
      type,
      label: `새 ${FIELD_TYPES.find((t) => t.value === type)?.label}`,
    };

    setConfig({
      ...config,
      fields: [...config.fields, newField],
    });
    setSelectedField(newField.id);
    setShowFieldEditor(true);
  };

  const updateField = (fieldId: string, updates: Partial<FieldConfig>) => {
    setConfig({
      ...config,
      fields: config.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    });
  };

  const removeField = (fieldId: string) => {
    setConfig({
      ...config,
      fields: config.fields.filter((field) => field.id !== fieldId),
    });
    setSelectedField(null);
    setShowFieldEditor(false);
  };

  const handleSave = async () => {
    try {
      await onSave(config);
    } catch (error) {
      console.error('폼 설정 저장 실패:', error);
    }
  };

  return (
    <ImportedBuilderContainer>
      <ToolbarSection>
        {/* ... 툴바 내용 */}
      </ToolbarSection>

      <FieldPalette>
        <h3>필드 타입</h3>
        {FIELD_TYPES.map((type) => (
          <Button
            key={type.value}
            onClick={() => addField(type.value)}
            variant="outline"
            disabled={isLoading}
          >
            {type.label} 추가
          </Button>
        ))}
      </FieldPalette>

      <FormPreview>
        <Card>
          <Input
            label="폼 제목"
            value={config.title}
            onChange={(e) =>
              setConfig({ ...config, title: e.target.value })
            }
            placeholder="폼 제목을 입력하세요"
          />
          <TextArea
            label="설명"
            value={config.description || ''}
            onChange={(e) =>
              setConfig({ ...config, description: e.target.value })
            }
            placeholder="폼에 대한 설명을 입력하세요"
            rows={4}
          />

          <DragDropWrapper onDragEnd={handleDragEnd}>
            <DroppableWrapper droppableId="form-fields">
              {(droppableProvided) => (
                <ImportedFieldsContainer
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  {config.fields.map((field, index) => (
                    <DraggableWrapper
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                    >
                      {(draggableProvided, snapshot) => (
                        <ImportedFormField
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                          onClick={() => {
                            setSelectedField(field.id);
                            setShowFieldEditor(true);
                          }}
                        >
                          <Card
                            selected={selectedField === field.id}
                          >
                            <div>
                              <strong>{field.label}</strong>
                              <small>{field.type}</small>
                            </div>
                            <Button
                              variant="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeField(field.id);
                              }}
                              disabled={isLoading}
                            >
                              ✕
                            </Button>
                          </Card>
                        </ImportedFormField>
                      )}
                    </DraggableWrapper>
                  ))}
                  {droppableProvided.placeholder}
                </ImportedFieldsContainer>
              )}
            </DroppableWrapper>
          </DragDropWrapper>
        </Card>

        <Button
          onClick={handleSave}
          disabled={isLoading || !config.title || config.fields.length === 0}
        >
          {isLoading ? '저장 중...' : '폼 저장'}
        </Button>
      </FormPreview>

      {showFieldEditor && selectedField && (
        <FieldEditor>
          <h3>필드 설정</h3>
          {(() => {
            const field = config.fields.find(
              (f) => f.id === selectedField
            );
            if (!field) return null;

            return (
              <div>
                <Input
                  label="라벨"
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, { label: e.target.value })
                  }
                />
                <Input
                  label="플레이스홀더"
                  value={field.placeholder || ''}
                  onChange={(e) =>
                    updateField(field.id, {
                      placeholder: e.target.value,
                    })
                  }
                />
                <Checkbox
                  label="필수 입력"
                  checked={field.required || false}
                  onChange={(checked: boolean) =>
                    updateField(field.id, {
                      required: checked,
                    })
                  }
                />

                {field.type === 'select' && (
                  <div>
                    <h4>옵션</h4>
                    {field.options?.map((option, index) => (
                      <div key={index}>
                        <Input
                          value={option.label}
                          onChange={(e) => {
                            const newOptions = [
                              ...(field.options || []),
                            ];
                            newOptions[index] = {
                              ...option,
                              label: e.target.value,
                            };
                            updateField(field.id, {
                              options: newOptions,
                            });
                          }}
                          placeholder="옵션 라벨"
                        />
                        <Input
                          value={option.value}
                          onChange={(e) => {
                            const newOptions = [
                              ...(field.options || []),
                            ];
                            newOptions[index] = {
                              ...option,
                              value: e.target.value,
                            };
                            updateField(field.id, {
                              options: newOptions,
                            });
                          }}
                          placeholder="옵션 값"
                        />
                        <Button
                          variant="icon"
                          onClick={() => {
                            const newOptions = [
                              ...(field.options || []),
                            ];
                            newOptions.splice(index, 1);
                            updateField(field.id, {
                              options: newOptions,
                            });
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        const newOptions = [
                          ...(field.options || []),
                          { value: '', label: '' },
                        ];
                        updateField(field.id, { options: newOptions });
                      }}
                    >
                      옵션 추가
                    </Button>
                  </div>
                )}

                {(field.type === 'text' ||
                  field.type === 'number') && (
                  <div>
                    <h4>유효성 검사</h4>
                    {field.type === 'text' && (
                      <Input
                        label="정규식 패턴"
                        value={field.validation?.pattern || ''}
                        onChange={(e) =>
                          updateField(field.id, {
                            validation: {
                              ...field.validation,
                              pattern: e.target.value,
                            },
                          })
                        }
                        placeholder="예: ^[A-Za-z]+$"
                      />
                    )}
                    {field.type === 'number' && (
                      <>
                        <Input
                          type="number"
                          label="최소값"
                          value={field.validation?.min || ''}
                          onChange={(e) =>
                            updateField(field.id, {
                              validation: {
                                ...field.validation,
                                min: Number(e.target.value),
                              },
                            })
                          }
                        />
                        <Input
                          type="number"
                          label="최대값"
                          value={field.validation?.max || ''}
                          onChange={(e) =>
                            updateField(field.id, {
                              validation: {
                                ...field.validation,
                                max: Number(e.target.value),
                              },
                            })
                          }
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </FieldEditor>
      )}
    </ImportedBuilderContainer>
  );
};

// Styled Components
// const StyledBuilderContainer = styled.div`...`;
// const StyledFieldsContainer = styled.div`...`;
// const StyledFormField = styled.div`...`;