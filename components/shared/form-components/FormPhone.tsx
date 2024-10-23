'use client';
import React from 'react';
import { IMask } from 'react-imask';
import { ClearButton, ErrorText, RequiredSymbol } from '..';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormPhone: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    formState: { errors },
    watch,
    setValue,
    control,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Controller
          name={name}
          control={control}
          defaultValue={value || ''}
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              className="h-12 text-md flex text-base w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              ref={(el) => {
                field.ref(el);
                if (el) {
                  IMask(el, {
                    mask: '+{7} (000) 000-00-00',
                  });
                }
              }}
              {...props}
            />
          )}
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
