import { useEffect, useState } from 'react';

export default function Timer() {
  const [value, SetValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      SetValue(currentValue => currentValue + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <span className="bg-red-50 text-xl">{value}</span>;
}
