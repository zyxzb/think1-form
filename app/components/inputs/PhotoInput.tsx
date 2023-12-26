'use client';

import { ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';

interface FileInputProps {
  labelText: string;
  name: string;
  photo: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FileInput = ({
  labelText,
  name,
  photo,
  onChange,
  onClick,
}: FileInputProps) => {
  return (
    <div className='mb-[48px] flex flex-col gap-[8px]'>
      <span className='flex text-[16px] text-textColor'>{labelText}</span>
      <label
        htmlFor={name}
        className={
          'flex h-[96px] w-full cursor-pointer items-center justify-center gap-[4px] rounded-[8px] border-[1px] border-defaultLabelBorder bg-defaultLabelBg text-[16px] font-medium text-textColor outline-none focus:border-[2px] sm:h-[116px]'
        }
      >
        {photo ? (
          <>
            <span>{photo.name}</span>
            <button className='p-[2px]' onClick={onClick}>
              <Image
                src='/icons/DefaultDeleteIcon.svg'
                width={20}
                height={20}
                alt='delete icon'
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

        <input
          id={name}
          name={name}
          onChange={onChange}
          className='hidden'
          type='file'
          accept='image/x-png,image/gif,image/jpeg,image/webp'
        />
      </label>
    </div>
  );
};

export default FileInput;
