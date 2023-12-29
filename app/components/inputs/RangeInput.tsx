'use client';

import {
  useEffect,
  useRef,
  forwardRef,
  MutableRefObject,
  RefCallback,
} from 'react';
type ForwardedRef =
  | MutableRefObject<HTMLInputElement | null>
  | RefCallback<HTMLInputElement>
  | null;

import { Controller } from 'react-hook-form';

interface RangeInputProps {
  labelText: string;
  name: string;
  age: string | number;
  control: any;
}

const RangeInput = forwardRef<HTMLInputElement, RangeInputProps>(
  ({ name, labelText, age, control, ...rest }, ref) => {
    const rangeThumbRef = useRef<HTMLDivElement>(null);
    const rangeNumberRef = useRef<HTMLSpanElement>(null);
    const rangeLineRef = useRef<HTMLDivElement>(null);
    const rangeInputRef = useRef<HTMLInputElement>(null);

    const setRefs = (
      element: HTMLInputElement | null,
      ref: ForwardedRef,
      rangeInputRef: MutableRefObject<HTMLInputElement | null>,
    ): void => {
      if (rangeInputRef && element) {
        rangeInputRef.current = element;
      }

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    useEffect(() => {
      const updateSlider = () => {
        const rangeInput = rangeInputRef.current;
        const rangeThumb = rangeThumbRef.current;
        const rangeLine = rangeLineRef.current;
        const rangeNumber = rangeNumberRef.current;

        if (!rangeInput || !rangeThumb || !rangeLine || !rangeNumber) return;

        const min = 8;
        const max = 100;
        const thumbPosition = ((+rangeInput.value - min) / (max - min)) * 100;
        const space = rangeInput.offsetWidth - rangeThumb.offsetWidth;

        rangeNumber.textContent = rangeInput.value;
        rangeThumb.style.left = thumbPosition * (space / 100) + 'px';
        rangeLine.style.width =
          (+rangeInput.value - min) * (100 / (max - min)) + '%';
      };

      updateSlider();

      const rangeInput = rangeInputRef.current;
      if (rangeInput) {
        rangeInput.addEventListener('input', updateSlider);
      }

      return () => {
        if (rangeInput) {
          rangeInput.removeEventListener('input', updateSlider);
        }
      };
    }, [age]);

    return (
      <div className='h-[92px] w-full '>
        <label htmlFor={name} className='mb-[16px] block text-textColor'>
          {labelText}
        </label>
        <div className='mx-[4px] mb-[5px] flex justify-between text-[12px] text-textColor'>
          <span>8</span>
          <span className='relative right-[-6px]'>100</span>
        </div>
        <div className='relative grid w-full place-items-center'>
          <div className='h-[4px] w-full overflow-hidden rounded-[8px] bg-defaultLabelBorder'>
            <div
              className='h-full w-full bg-defaultButton'
              ref={rangeLineRef}
            />
          </div>

          {/* Range Dot */}
          <div
            className='absolute h-[16px] w-[16px] rounded-full bg-defaultButton'
            ref={rangeThumbRef}
          >
            {/* Range Info */}
            <div className='absolute -bottom-[40px] -left-[11px] grid h-[31px] w-[37px] place-items-center rounded-[4px] border-[1px] border-defaultLabelBorder bg-activeLabelBg'>
              <span
                className='z-10 text-[12px] font-medium text-defaultButton'
                ref={rangeNumberRef}
              >
                {age}
              </span>
              <div className='absolute -top-[4.7px] h-2 w-2 rotate-45 border-l-[1px] border-t-[1px] border-defaultLabelBorder bg-activeLabelBg'></div>
            </div>
          </div>

          <Controller
            control={control}
            name={name}
            render={() => (
              <input
                name={name}
                value={age}
                id={name}
                ref={(element) => setRefs(element, ref, rangeInputRef)}
                className='absolute h-[16px] w-full cursor-pointer appearance-none opacity-0'
                type='range'
                min='8'
                max='100'
                step='1'
                required
                {...rest}
              />
            )}
          />
        </div>
      </div>
    );
  },
);

export default RangeInput;
