import { FC } from 'react';
import { Container } from './Container';
import { SortPopup } from './SortPopup';
import { Categories } from './Categories';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const TopBar: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};

export default TopBar;
