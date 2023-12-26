'use client';

import { ChangeEvent } from 'react';
import { InputInfo } from './';

interface InputProps {
  labelText: string;
  name: string;
  value: string;
  type: 'text' | 'email';
  error: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  labelText,
  name,
  value,
  type,
  error,
  onChange,
}: InputProps) => {
  return (
    <div className='flex flex-col gap-[8px] text-textColor'>
      <label htmlFor={name} className='flex text-[16px]'>
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        autoComplete='off'
        onChange={onChange}
        className={`h-[48px] w-full rounded-[8px] border-[1px] border-defaultLabelBorder bg-defaultLabelBg px-[16px] font-medium text-textColor outline-none focus:border-[2px] focus:bg-activeLabelBg
        ${
          error
            ? 'focus:border-errorLabelBorder focus:bg-errorLabelBg'
            : 'focus:border-activeLabelBorder '
        }
        `}
      />
      {error && <InputInfo error={error} />}
    </div>
  );
};

export default Input;
