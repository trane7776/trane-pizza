import React from 'react';
import { FormInput, WhiteBlock } from '..';
import { Input } from '@/components/ui';

interface Props {
  className?: string;
}

export const CheckoutPersonal: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" className="text-base" placeholder="имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="e-mail" />
        <FormInput
          name="phone"
          className="text-base"
          placeholder="номер телефона"
        />
      </div>
    </WhiteBlock>
  );
};
