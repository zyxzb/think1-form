'use client';

import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';
import toast from 'react-hot-toast';

import { Input, PhotoInput, RangeInput } from './inputs';
import { Heading, Button } from './';
import { Calendar } from './calendar';

const initialState = {
  name: '',
  surname: '',
  email: '',
  age: 8,
  time: '',
  date: null,
  file: null,
};

const Form = () => {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    nameError: '',
    surnameError: '',
    emailError: '',
  });

  const isAllFieldsFilled = Object.values(formData).every((value) => {
    return value !== null && value !== undefined && value !== '' && value !== 0;
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, surname, email, age, time, date, file } = formData;

    if (!name || !surname || !email || !age || !time || !date || !file) {
      toast.error('Please complete all fields, add a photo and select a date');
      return;
    }

    try {
      setIsPending(true);
      const data = new FormData();
      data.set('name', name);
      data.set('surname', surname);
      data.set('email', email);
      data.set('age', age.toString());
      data.set('time', time);
      data.set('date', date);
      data.set('file', file);

      // File as a string (for example cloudinary)->
      // 1. Delete const data = new FormData(); and data.ses
      // 2. Aet body as: JSON.stringify(formData)
      // 3. Api route: change request.formData() to request.json();

      const res = await fetch('/api/form', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error();
      if (res.ok) toast.success('Success');
    } catch (error: any) {
      toast.error('Something went wrong');
      console.error(error);
    }

    setIsPending(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = e.target;
    let newFormData = { ...formData };

    if (type === 'file') {
      const file = files?.[0];
      newFormData = { ...newFormData, [name]: file };
    } else {
      newFormData = { ...newFormData, [name]: value };
    }

    // Validate and set errors for each field independently
    let newErrors = { ...errors };

    switch (name) {
      case 'name':
        newErrors.nameError = newFormData.name.trim() ? '' : 'Name is required';
        break;
      case 'surname':
        newErrors.surnameError = newFormData.surname.trim()
          ? ''
          : 'Surname is required';
        break;
      case 'email':
        if (!newFormData.email.trim()) {
          newErrors.emailError = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(newFormData.email.trim())) {
          newErrors.emailError =
            'Please use correct formatting. </br> Example: address@email.com';
        } else {
          newErrors.emailError = '';
        }
        break;
    }

    setFormData(newFormData);
    setErrors(newErrors);
  };

  const handleDeleteFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Find the file input element and reset its value if you are trying to upload the same file after deleting it
    const fileInput =
      document.querySelector<HTMLInputElement>(`input[name='file']`);
    if (fileInput) fileInput.value = '';
    setFormData({ ...formData, file: null });
  };

  const handleCalendarChange = (name: string, value: Date | string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      className='flex w-full max-w-[426px] flex-col'
      onSubmit={handleSubmit}
      // off default validation
      noValidate
    >
      <Heading text='Personal info' />
      <div className='mb-[48px] flex flex-col gap-[24px]'>
        <Input
          name='name'
          type='text'
          labelText='First Name'
          onChange={handleInputChange}
          error={errors.nameError}
        />
        <Input
          name='surname'
          type='text'
          labelText='Last Name'
          onChange={handleInputChange}
          error={errors.surnameError}
        />
        <Input
          name='email'
          type='email'
          labelText='Email Address'
          onChange={handleInputChange}
          error={errors.emailError}
        />
        <RangeInput
          name='age'
          labelText='Age'
          age={formData.age}
          onChange={handleInputChange}
        />
      </div>
      <PhotoInput
        name='file'
        labelText='Photo'
        photo={formData.file}
        onChange={handleInputChange}
        onClick={handleDeleteFile}
      />
      <Heading text='Your workout' />
      <Calendar
        selectedDate={formData.date}
        selectedTime={formData.time}
        handleCalendarChange={handleCalendarChange}
      />
      <Button
        type='submit'
        text='Send Application'
        disabled={!isAllFieldsFilled}
        pending={isPending}
      />
    </form>
  );
};

export default Form;
