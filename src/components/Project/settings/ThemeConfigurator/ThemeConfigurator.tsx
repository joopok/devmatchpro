import React, { useState } from 'react';
import { ColorPicker } from '../../../common/ColorPicker';
import { Switch } from '../../../common/Switch';
import { Slider } from '../../../common/Slider';
import { Button } from '../../../common/Button';
import {
  ConfiguratorContainer,
  ColorSection,
  TypographySection,
  SpacingSection,
  PreviewSection,
} from './ThemeConfigurator.styles';
import type { ThemeConfig } from '../../../../types/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../../../store/slices/themeSlice';
import { RootState } from '../../../../store/store';

interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: string;
}

interface Typography {
  fontFamily: string;
  fontSize: {
    base: string;
  };
  lineHeight: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
}

interface ThemeConfiguratorProps {
  initialConfig: ThemeConfig;
  onSave: (config: ThemeConfig) => Promise<void>;
  onPreview: (config: ThemeConfig) => void;
  onReset: () => void;
  isLoading: boolean;
}

export const ThemeConfigurator: React.FC<ThemeConfiguratorProps> = ({
  initialConfig,
  onSave,
  onPreview,
  onReset,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [config, setConfig] = useState<ThemeConfig>(initialConfig);
  const [previewMode, setPreviewMode] = useState(false);

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setConfig((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value,
      },
    }));
  };

  const handleTypographyChange = (key: keyof Typography, value: string | number) => {
    setConfig((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }));
  };

  const handleFontSizeChange = (value: number) => {
    setConfig((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        fontSize: {
          ...prev.typography.fontSize,
          base: `${value}px`,
        },
      },
    }));
  };

  const handleSpacingChange = (value: number) => {
    setConfig((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        base: `${value}px`,
      },
    }));
  };

  const handleBorderRadiusChange = (value: number) => {
    setConfig((prev) => ({
      ...prev,
      borderRadius: value,
    }));
  };

  const handlePreview = () => {
    setPreviewMode(true);
    onPreview(config);
  };

  const handleSave = async () => {
    try {
      await onSave(config);
      setPreviewMode(false);
    } catch (error) {
      console.error('테마 저장 실패:', error);
    }
  };

  const handleReset = () => {
    setConfig(initialConfig);
    onReset();
    setPreviewMode(false);
  };

  const handleThemeChange = () => {
    dispatch(setTheme(!isDarkMode));
  };

  return (
    <ConfiguratorContainer>
      <ColorSection>
        <h3>색상</h3>
        <div>
          <ColorPicker
            label="기본 색상"
            value={config.colors.primary}
            onChange={(value) => handleColorChange('primary', value)}
          />
          <ColorPicker
            label="보조 색상"
            value={config.colors.secondary}
            onChange={(value) => handleColorChange('secondary', value)}
          />
          <ColorPicker
            label="성공"
            value={config.colors.success}
            onChange={(value) => handleColorChange('success', value)}
          />
          <ColorPicker
            label="경고"
            value={config.colors.warning}
            onChange={(value) => handleColorChange('warning', value)}
          />
          <ColorPicker
            label="오류"
            value={config.colors.error}
            onChange={(value) => handleColorChange('error', value)}
          />
          <ColorPicker
            label="정보"
            value={config.colors.info}
            onChange={(value) => handleColorChange('info', value)}
          />
        </div>
        <div>
          <ColorPicker
            label="배경"
            value={config.colors.background}
            onChange={(value) => handleColorChange('background', value)}
          />
          <ColorPicker
            label="표면"
            value={config.colors.surface}
            onChange={(value) => handleColorChange('surface', value)}
          />
          <ColorPicker
            label="텍스트"
            value={config.colors.text}
            onChange={(value) => handleColorChange('text', value)}
          />
        </div>
        <Switch
          label="다크 모드"
          checked={isDarkMode}
          onChange={handleThemeChange}
        />
      </ColorSection>

      <TypographySection>
        <h3>타이포그래피</h3>
        <select
          value={config.typography.fontFamily}
          onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
        >
          <option value="Pretendard">Pretendard</option>
          <option value="Noto Sans KR">Noto Sans KR</option>
          <option value="Spoqa Han Sans Neo">Spoqa Han Sans Neo</option>
        </select>
        <Slider
          label="기본 글자 크기"
          min={12}
          max={20}
          step={1}
          value={parseInt(config.typography.fontSize.base)}
          onChange={handleFontSizeChange}
        />
        <Slider
          label="줄 높이"
          min={1}
          max={2}
          step={0.1}
          value={config.typography.lineHeight}
          onChange={(value) => handleTypographyChange('lineHeight', value)}
        />
      </TypographySection>

      <SpacingSection>
        <h3>여백과 둥글기</h3>
        <Slider
          label="기본 여백"
          min={4}
          max={16}
          step={2}
          value={parseInt(config.spacing.base)}
          onChange={handleSpacingChange}
        />
        <Slider
          label="모서리 둥글기"
          min={0}
          max={24}
          step={2}
          value={config.borderRadius}
          onChange={handleBorderRadiusChange}
        />
        <Slider
          label="컨테이너 패딩"
          min={8}
          max={32}
          step={4}
          value={config.spacing.containerPadding}
          onChange={(value) => handleSpacingChange(value)}
        />
      </SpacingSection>

      <PreviewSection>
        <div>
          <Button
            onClick={handlePreview}
            variant="outline"
            disabled={isLoading || previewMode}
          >
            미리보기
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !previewMode}
          >
            {isLoading ? '저장 중...' : '저장'}
          </Button>
          <Button
            onClick={handleReset}
            variant="text"
            disabled={isLoading}
          >
            초기화
          </Button>
        </div>
      </PreviewSection>
    </ConfiguratorContainer>
  );
}; 