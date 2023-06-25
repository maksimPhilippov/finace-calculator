import { useState } from "react";

interface DatePickerProp {
  value: Date;
  setter: (date: Date) => void;
  enabled: boolean;
}

export default function DatePicker(prop: DatePickerProp) {
  const [day, setDay] = useState(prop.value.getDate());
  const [month, setMonth] = useState(prop.value.getMonth());
  const [year, setYear] = useState(prop.value.getFullYear());
  const hours = 4;

  function getDaysInMonth(selectedYear: number, selectedMonth: number) {
    return 32 - new Date(selectedYear, selectedMonth, 32).getDate();
  }

  function validateNumber(digitsCount: number, num: string) {
    if (!prop.enabled) return false;
    if (num.length > digitsCount) {
      num = num.slice(0, digitsCount);
    }
    let value = parseInt(num);

    if (Number.isNaN(value)) {
      return 0;
    } else {
      return value;
    }
  }

  function finalValidation() {
    let newYear = year;
    let newMonth = month;
    let newDay = day;

    if (newYear < 1970) {
      newYear = 1970;
    } else if (newYear > 3000) {
      newYear = 3000;
    }

    if (newMonth < 1) {
      newMonth = 1;
    } else if (newMonth > 12) {
      newMonth = 12;
    }
    newMonth--;

    const dateLimiter = getDaysInMonth(newYear, newMonth);
    if (newDay > dateLimiter) {
      newDay = dateLimiter;
    } else if (newDay < 1) {
      newDay = 1;
    }

    const newDate = new Date(newYear, newMonth, newDay, hours);
    newMonth++;

    setDay(newDay);
    setMonth(newMonth);
    setYear(newYear);
  }

  return (
    <div className="date-picker" onBlur={finalValidation}>
      <input
        size={2}
        type="text"
        className="date-picker-day"
        value={day}
        onChange={(e) => {
          const number = validateNumber(2, e.target.value);
          if (number !== false) {
            setDay(number);
          }
        }}
      />
      <input
        size={2}
        type="text"
        className="date-picker-month"
        value={month}
        onChange={(e) => {
          const number = validateNumber(2, e.target.value);
          if (number !== false) {
            setMonth(number);
          }
        }}
      />
      <input
        size={4}
        type="text"
        className="date-picker-year"
        value={year}
        onChange={(e) => {
          const number = validateNumber(4, e.target.value);
          if (number !== false) {
            setYear(number);
          }
        }}
      />
    </div>
  );
}
