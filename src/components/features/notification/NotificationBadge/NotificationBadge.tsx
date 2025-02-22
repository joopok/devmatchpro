import React, { useEffect, useState } from 'react';
import { Icon } from '../../../../assets/Icon';
import {
  BadgeContainer,
  Counter,
  Indicator,
  Tooltip,
} from './NotificationBadge.styles';
import { Badge } from '../../../common/Badge/Badge';

interface NotificationBadgeProps {
  count: number;
  hasUnread: boolean;
  onClick?: () => void;
  showCount?: boolean;
  maxCount?: number;
  pulseOnUpdate?: boolean;
  tooltip?: string;
  size?: 'small' | 'medium' | 'large';
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  hasUnread,
  onClick,
  showCount = true,
  maxCount = 99,
  pulseOnUpdate = true,
  tooltip,
  size = 'medium',
}) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [prevCount, setPrevCount] = useState(count);

  useEffect(() => {
    if (count > prevCount && pulseOnUpdate) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevCount(count);
  }, [count, prevCount, pulseOnUpdate]);

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <BadgeContainer
      onClick={onClick}
      size={size}
      className={isPulsing ? 'pulse' : ''}
      role="button"
      tabIndex={0}
    >
      <Badge
        content={count}
        variant="error"
        overlap
      >
        <Icon name="bell" size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
      </Badge>
      {hasUnread && <Indicator />}
      {showCount && count > 0 && <Counter>{displayCount}</Counter>}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </BadgeContainer>
  );
}; 