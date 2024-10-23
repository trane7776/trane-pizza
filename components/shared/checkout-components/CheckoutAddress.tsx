import React from 'react';
import { FormTextarea, WhiteBlock } from '..';
import { Input } from '@/components/ui';

interface Props {
  className?: string;
}

export const CheckoutAddress: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Input
          name="address"
          className="text-base"
          placeholder="введите адресс..."
        />
        <FormTextarea
          name="comment"
          className="text-base"
          rows={5}
          placeholder="комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
