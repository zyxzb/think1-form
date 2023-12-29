'use client';

import { availableHours } from '../../constants';
import { classNames } from '@/app/utils';

interface TimeProps {
  selectedTime: string;
  setValue: any;
}

const Time = ({ selectedTime, setValue }: TimeProps) => {
  return (
    <div className='flex flex-col gap-[8px]'>
      <span className='text-[16px] text-textColor'>Time</span>
      <div className='flex flex-wrap gap-[8px] sm:flex-col'>
        {availableHours.map((hour) => (
          <button
            key={hour}
            type='button'
            aria-label='select hour'
            onClick={() => {
              setValue('time', hour);
            }}
            className={classNames(`flex h-[46px] w-[79px] items-center justify-center  rounded-[8px] bg-defaultLabelBg text-textColor sm:w-[76px]
            ${
              selectedTime === hour
                ? 'border-[2px] border-defaultButton'
                : 'border-[1px] border-defaultLabelBorder hover:bg-inactiveButton hover:text-defaultLabelBg'
            }
            `)}
          >
            {hour}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Time;
