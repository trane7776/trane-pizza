import { Search } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex rounded-2xl flex-1 justify-between relative h-11 ">
      <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-500" />
    </div>
  );
};
