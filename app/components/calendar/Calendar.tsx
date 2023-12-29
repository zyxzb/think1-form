'use client';

import { useState } from 'react';
import Image from 'next/image';

import { HolidayInfo, Time } from './';
import { colStartClasses, daysOfWeek } from '@/app/constants';
import useHolidays from '@/app/hooks/useHolidays';

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  parse,
  startOfToday,
  isSunday,
} from 'date-fns';

interface CalendarProps {
  selectedDate: Date;
  selectedTime: any;
  control: any;
  setValue: any;
}

const Calendar = ({ selectedDate, selectedTime, setValue }: CalendarProps) => {
  const today = startOfToday();

  const [holidayDayName, setHolidayDayName] = useState('');
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const holidays = useHolidays();

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  return (
    <div className='mb-[32px] flex flex-col gap-[24px] sm:flex-row'>
      <div className='flex flex-col'>
        <div className='mb-[8px] '>
          <span className='text-[16px] text-textColor'>Date</span>
        </div>
        <div className='h-full w-full rounded-[8px] border-[1px] border-defaultLabelBorder bg-defaultLabelBg p-[24px] sm:w-[326px]'>
          <div className='mb-[22px] flex items-center justify-between'>
            <button type='button' onClick={previousMonth}>
              <Image
                src={'/icons/CalendarArrowLeft.svg'}
                alt='arrow left'
                width={32}
                height={32}
              />
            </button>
            <div className='flex flex-1 items-center justify-center'>
              <h3 className='font-medium text-textColor'>
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h3>
            </div>
            <button onClick={nextMonth} type='button'>
              <Image
                src={'/icons/CalendarArrowRight.svg'}
                alt='arrow left'
                width={32}
                height={32}
              />
            </button>
          </div>
          <div className='mb-[24px] grid grid-cols-7 text-center text-[14px] font-medium text-textColor'>
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className='grid grid-cols-7'>
            {days.map((day, dayIdx) => {
              const isNationalDay = holidays.some((holiday: any) => {
                const holidayDate = new Date(holiday.date);
                const type = holiday.type === 'NATIONAL_HOLIDAY';
                return (
                  day.toDateString() === holidayDate.toDateString() && type
                );
              });

              const isObservance = holidays
                .filter((holiday: any) => {
                  const holidayDate = new Date(holiday.date);
                  const type = holiday.type === 'OBSERVANCE';
                  return (
                    day.toDateString() === holidayDate.toDateString() && type
                  );
                })
                .map((holiday: any) => holiday.name)[0];

              return (
                <div
                  key={day.toString()}
                  className={` ${
                    dayIdx === 0 && colStartClasses[getDay(day) - 1]
                  } ${
                    isSunday(day) || isNationalDay
                      ? 'select-none text-inactiveDayColor'
                      : 'text-textColor'
                  } `}
                >
                  <button
                    type='button'
                    disabled={isSunday(day) || isNationalDay}
                    onClick={() => {
                      setValue('date', day);
                      setHolidayDayName(isObservance);
                    }}
                    className={`mx-auto flex h-[32px] w-[32px] items-center justify-center rounded-full ${
                      selectedDate && isEqual(day, selectedDate)
                        ? 'bg-defaultButton text-white'
                        : 'hover:bg-inactiveButton hover:text-defaultLabelBg'
                    } ${isSunday(day) && 'cursor-not-allowed'} ${
                      isNationalDay && 'cursor-not-allowed'
                    } `}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {holidayDayName && <HolidayInfo holidayDayName={holidayDayName} />}
      </div>
      {selectedDate && <Time setValue={setValue} selectedTime={selectedTime} />}
    </div>
  );
};

export default Calendar;
