import { forwardRef } from 'react';
import { InputInfo } from './';
import { classNames } from '@/app/utils';

interface InputProps {
  labelText: string;
  name: string;
  type: 'text' | 'email';
  error: string | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, name, type, error, ...rest }, ref) => {
    return (
      <div className='flex flex-col gap-[8px] text-textColor'>
        <label htmlFor={name} className='flex text-[16px]'>
          {labelText}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          ref={ref}
          autoComplete='off'
          {...rest}
          className={classNames(`h-[48px] w-full rounded-[8px] border-[1px] border-defaultLabelBorder bg-defaultLabelBg px-[16px] font-medium text-textColor outline-none focus:border-[2px] focus:bg-activeLabelBg
        ${
          error
            ? 'focus:border-errorLabelBorder focus:bg-errorLabelBg'
            : 'focus:border-activeLabelBorder '
        }
        `)}
        />
        {error && <InputInfo error={error} />}
      </div>
    );
  },
);

export default Input;
