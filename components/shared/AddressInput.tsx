'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  const token = process.env.NEXT_PUBLIC_DADATA;

  return (
    <AddressSuggestions
      token={token!}
      onChange={(data) => onChange?.(data?.value)}
      inputProps={{
        className:
          'h-12 text-md flex text-base w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      }}
    />
  );
};
