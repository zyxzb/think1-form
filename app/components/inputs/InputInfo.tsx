'use client';

import Image from 'next/image';

interface InputInfo {
  error: string;
}

const InputInfo = ({ error }: InputInfo) => {
  return (
    <div className='flex gap-[8px]'>
      <Image
        src='/icons/InputErrorIcon.svg'
        alt='Error'
        width={18}
        height={18}
      />
      <span
        className='text-[14px] text-textColor'
        dangerouslySetInnerHTML={{ __html: error }}
      />
    </div>
  );
};

export default InputInfo;
