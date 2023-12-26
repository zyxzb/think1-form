export const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

export const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const availableHours = ['12:00', '14:00', '16:30', '18:30', '20:00'];

export const inputFields = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    labelText: 'First Nam',
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    required: true,
    pattern: '^[A-Za-z0-9]{3,16}$',
    autocomplete: 'off',
  },
  {
    id: 2,
    name: 'surname',
    type: 'text',
    labelText: 'Last Name',
    errorMessage:
      "Surname should be 3-16 characters and shouldn't include any special character!",
    required: true,
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    autocomplete: 'off',
  },
  {
    id: 3,
    name: 'email',
    type: 'email',
    labelText: 'Email Address',
    errorMessage: 'Please use correct formatting. Example: address@email.com',
    required: true,
    autocomplete: 'off',
  },
];
