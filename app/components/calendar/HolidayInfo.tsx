import Image from 'next/image';

interface HolidayInfo {
  holidayDayName: string;
}

const HolidayInfo = ({ holidayDayName }: HolidayInfo) => {
  return (
    <div className='mt-[12px] flex gap-[8px]'>
      <Image
        src='/icons/HolidayIcon.svg'
        alt='Holiday Info'
        width={18}
        height={18}
      />
      <span className='text-[14px] text-textColor'>{holidayDayName}</span>
    </div>
  );
};

export default HolidayInfo;
