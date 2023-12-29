'use client';

import { ChangeEvent, forwardRef, MouseEvent } from 'react';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import { InputInfo } from '.';

interface FileInputProps {
  labelText: string;
  name: string;
  control: any;
  setValue: any;
  error: any;
  file: null | FileList;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ labelText, name, control, setValue, file, error, ...rest }, ref) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        setValue(name, files[0]);
      }
    };

    const handleRemoveFile = (e: MouseEvent) => {
      e.preventDefault();
      setValue(name, null);
    };

    return (
      <div className='mb-[48px] flex flex-col gap-[8px]'>
        <span className='flex text-[16px] text-textColor'>{labelText}</span>
        <label
          htmlFor={name}
          className={
            'flex h-[96px] w-full cursor-pointer items-center justify-center gap-[4px] rounded-[8px] border-[1px] border-defaultLabelBorder bg-defaultLabelBg text-[16px] font-medium text-textColor outline-none focus:border-[2px] sm:h-[116px]'
          }
        >
          {file && file[0] ? (
            <>
              <span>{file[0].name}</span>
              <button className='p-[2px]' onClick={handleRemoveFile}>
                <Image
                  src='/icons/DefaultDeleteIcon.svg'
                  width={20}
                  height={20}
                  alt='delete file'
                />
              </button>
            </>
          ) : (
            <>
              <span className='text-activeLabelBorder underline underline-offset-[3.2px]'>
                Upload a file
              </span>
              <span className='hidden text-[#898DA9] sm:inline'>
                &nbsp;or drag and drop here
              </span>
            </>
          )}
          <Controller
            control={control}
            name={name}
            render={() => (
              <input
                type='file'
                id={name}
                name={name}
                ref={ref}
                onChange={handleFileChange}
                className='hidden'
                accept='image/x-png,image/gif,image/jpeg,image/webp'
                {...rest}
              />
            )}
          />
        </label>
        {error && <InputInfo error={error} />}
      </div>
    );
  },
);

export default FileInput;
