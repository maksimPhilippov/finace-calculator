interface DatePickerProp {
  value: Date;
  setter: (date: Date) => void;
  enabled: boolean;
}

export default function DatePicker(prop: DatePickerProp) {
  const day = prop.value.getDate();
  const month = prop.value.getMonth();
  const year = prop.value.getFullYear();
  const hours = 4;

  function getDaysInMonth(selectedYear: number, selectedMonth: number) {
    return 32 - new Date(selectedYear, selectedMonth, 32).getDate();
  }

  function validateDay(
    newDay: number,
    currentYear: number,
    currentMonth: number
  ) {
    const dateLimiter = getDaysInMonth(currentYear, currentMonth);
    if (newDay > dateLimiter) {
      newDay = dateLimiter;
    } else if (newDay < 1) {
      newDay = 1;
    }
    return newDay;
  }

  function setDay(newDay: string) {
    if (!prop.enabled) return;
    let value = parseInt(newDay);
    if (Number.isNaN(value)) {
      value = 1;
    }

    value = validateDay(value, year, month);
    const newDate = new Date(year, month, value, hours);
    prop.setter(newDate);
  }

  function setMonth(newMonth: string) {
    if (!prop.enabled) return;
    let value = parseInt(newMonth);
    if (Number.isNaN(value)) {
      value = 0;
    }
    value--;
    if (value > 11) {
      value = 11;
    } else if (value < 0) {
      value = 0;
    }

    let dayValue = validateDay(day, year, value);
    const newDate = new Date(year, value, dayValue, hours);
    prop.setter(newDate);
  }

  function setYear(newYear: string) {
    if (!prop.enabled) return;
    let value = parseInt(newYear);
    if (Number.isNaN(value)) {
      value = 0;
    } else if (value < 0) {
      value = 0;
    } else if (value > 3000) {
      value = 3000;
    }

    let dayValue = validateDay(day, value, month);

    const newDate = new Date(value, month, dayValue, hours);
    if (value < 1000) {
      newDate.setFullYear(value);
    }
    prop.setter(newDate);
  }

  return (
    <div className="date-picker">
      <input
        size={2}
        type="text"
        className="date-picker-day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />
      <input
        size={2}
        type="text"
        className="date-picker-month"
        value={month + 1}
        onChange={(e) => setMonth(e.target.value)}
      />
      <input
        size={4}
        type="text"
        className="date-picker-year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
    </div>
  );
}
