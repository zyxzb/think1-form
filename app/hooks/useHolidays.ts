import { useState, useEffect } from 'react';

const useHolidays = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const getHolidays = async () => {
      try {
        const response = await fetch(
          'https://api.api-ninjas.com/v1/holidays?country=PL&year=2023',
          {
            headers: {
              'X-Api-Key': String(process.env.NEXT_PUBLIC_API_KEY),
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch holidays');
        }

        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error(error);
      }
    };
    getHolidays();
  }, []);

  return holidays;
};

export default useHolidays;
