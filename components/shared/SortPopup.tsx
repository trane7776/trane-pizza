import { cn } from '@/lib/utils';
import { FC } from 'react';

interface Props {
  className?: string;
}

export const SortPopup: FC<Props> = ({ className }) => {
  return (
    <div className={cn('inline-flex items-center', className)}>SortPopup</div>
  );
};

export default SortPopup;
