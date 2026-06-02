import { useState } from "react";
import dayjs from "dayjs";

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs("2026-03-01"));
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = currentDate.startOf("month");
  const startDayOfWeek = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const emptyDays = Array(startDayOfWeek).fill(null);
  const daysArray = [
    ...emptyDays,
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleDateClick = (day) => {
    if (day) {
      const newSelectedDate = currentDate.date(day);
      setSelectedDate(newSelectedDate);
    }
  };

  const goPrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
    setSelectedDate(null);
  };

  const goNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
    setSelectedDate(null);
  };

  const isSelected = (day) => {
    if (!selectedDate) return false;
    return (
      selectedDate.date() === day &&
      selectedDate.month() === currentDate.month() &&
      selectedDate.year() === currentDate.year()
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goPrevMonth}
          className="text-gray-500 text-base px-1.5 hover:text-gray-700"
        >
          {"<"}
        </button>
        <h4 className="text-base font-semibold text-gray-700">
          {currentDate.format("MMMM YYYY")}
        </h4>
        <button
          onClick={goNextMonth}
          className="text-gray-500 text-base px-1.5 hover:text-gray-700"
        >
          {">"}
        </button>
      </div>

      {/* Days of week - بزرگتر 10% */}
      <div className="grid grid-cols-7 gap-0.5 text-center text-gray-400 mb-1.5">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
          <div key={d} className="text-[11px] font-medium">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid - سلول‌ها 10% بزرگتر */}
      <div className="grid grid-cols-7 gap-0.5">
        {daysArray.map((day, idx) => (
          <div
            key={idx}
            onClick={() => handleDateClick(day)}
            className={`
              flex items-center justify-center
              h-9 w-9 rounded-full
              text-sm text-gray-700
              cursor-pointer transition-all
              mx-auto
              ${day ? "hover:bg-gray-100" : ""}
              ${isSelected(day) ? "bg-green-500 text-white hover:bg-green-600" : ""}
            `}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCalendar;
