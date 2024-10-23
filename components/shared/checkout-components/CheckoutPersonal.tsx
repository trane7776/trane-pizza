'use client';
import React from 'react';
import { FormInput, FormPhone, WhiteBlock } from '..';

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
        <FormPhone
          name="phone"
          className="text-base"
          placeholder="+7 (___) ___-__-__"
        />
      </div>
    </WhiteBlock>
  );
};
