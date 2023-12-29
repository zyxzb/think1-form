'use client';

// import toast from 'react-hot-toast';

import { Input, PhotoInput, RangeInput } from './inputs';
import { Heading, Button } from './';
import { Calendar } from './calendar';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(1),
  surname: z.string().trim().min(1),
  email: z.string().email(),
  file: z.any().refine((files) => files?.length === 1, 'File is required.'),
  age: z.any(),
  date: z.date(),
  time: z.any(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    defaultValues: {
      age: 8,
    },
    resolver: zodResolver(formSchema),
  });

  const watchedFile = watch('file');
  const watchedAge = watch('age');
  const watchedDate = watch('date');
  const watchedTime = watch('time');

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log('data-->', data);
  };

  return (
    <form
      className='flex w-full max-w-[426px] flex-col'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading text='Personal info' />
      <div className='mb-[48px] flex flex-col gap-[24px]'>
        <Input
          type='text'
          labelText='First Name'
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          type='text'
          labelText='Last Name'
          error={errors.surname?.message}
          {...register('surname')}
        />
        <Input
          type='email'
          labelText='Email Address'
          error={errors.email?.message}
          {...register('email')}
        />
        <RangeInput
          labelText='Age'
          control={control}
          age={watchedAge}
          {...register('age')}
        />
      </div>
      <PhotoInput
        labelText='Photo'
        error={errors.file?.message}
        control={control}
        setValue={setValue}
        file={watchedFile}
        {...register('file')}
      />
      <Heading text='Your workout' />
      <Calendar
        control={control}
        setValue={setValue}
        selectedDate={watchedDate}
        selectedTime={watchedTime}
      />
      <Button
        type='submit'
        text='Send Application'
        disabled={false}
        pending={isSubmitting}
      />
    </form>
  );
};

export default Form;
