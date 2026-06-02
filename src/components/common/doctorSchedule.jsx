import React from "react";

const DoctorSchedule = () => {
  // اطلاعات جدول (مطابق تصویر شما)
  const scheduleData = [
    {
      name: "Dr. Yasser el Gharieb",
      room1: { title: "Cardiology", phone: "+964 55 123 4567" },
      anyName: { title: "Cardiology", doctor: "Anina Al-Shehri" },
      reception: "Staff",
      record: { title: "Cardiology", type: "Specialty" },
    },
    // می‌توانید سطرهای دیگر را اضافه کنید
  ];

  // روزهای هفته
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // ستون‌های اصلی (به جز روزها)
  const columns = ["Name", "Room 1", "Any name", "Reception", "Record"];

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4 font-sans bg-gray-50 rounded-2xl shadow-lg">
      <h2 className="text-right text-2xl font-semibold text-gray-800 mb-4">
        📅 برنامه هفتگی پزشکان
      </h2>

      {/* جدول اصلی */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="w-full border-collapse bg-white">
          {/* هدر روزهای هفته */}
          <thead>
            <tr className="bg-blue-900 text-white">
              {weekDays.map((day, idx) => (
                <th
                  key={idx}
                  className="py-3 px-2 text-sm font-bold text-center border-r border-blue-800"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          {/* هدر ستون‌های اطلاعات */}
          <thead>
            <tr className="bg-gray-200 text-gray-700 border-b-2 border-gray-300">
              {columns.map((col, idx) => (
                <th key={idx} className="py-3 px-2 font-semibold text-center">
                  {col}
                </th>
              ))}
              <th className="py-3 px-2 font-semibold text-center">FRI</th>
              <th className="py-3 px-2 font-semibold text-center">SAT</th>
            </tr>
          </thead>

          {/* بدنه جدول (داده‌ها) */}
          <tbody>
            {scheduleData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-2 font-bold bg-blue-50 text-blue-900 text-center">
                  {row.name}
                </td>
                <td className="py-3 px-2 border border-gray-200 align-top text-center">
                  <div className="flex flex-col gap-1">
                    <strong className="text-sm text-blue-800">
                      {row.room1.title}
                    </strong>
                    <small className="text-xs text-gray-600">
                      {row.room1.phone}
                    </small>
                  </div>
                </td>
                <td className="py-3 px-2 border border-gray-200 align-top text-center">
                  <div className="flex flex-col gap-1">
                    <strong className="text-sm text-blue-800">
                      {row.anyName.title}
                    </strong>
                    <small className="text-xs text-gray-600">
                      {row.anyName.doctor}
                    </small>
                  </div>
                </td>
                <td className="py-3 px-2 border border-gray-200 text-center">
                  {row.reception}
                </td>
                <td className="py-3 px-2 border border-gray-200 align-top text-center">
                  <div className="flex flex-col gap-1">
                    <strong className="text-sm text-blue-800">
                      {row.record.title}
                    </strong>
                    <small className="text-xs text-gray-600">
                      {row.record.type}
                    </small>
                  </div>
                </td>
                <td className="py-3 px-2 border border-gray-200 text-center bg-yellow-50 text-yellow-700 italic">
                  -
                </td>
                <td className="py-3 px-2 border border-gray-200 text-center bg-yellow-50 text-yellow-700 italic">
                  -
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* دکمه + Add a Capacity */}
      <div className="mt-6 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-8 rounded-full shadow-md transition-all duration-200 hover:scale-105">
          ✚ Add a Capacity
        </button>
      </div>
    </div>
  );
};

export default DoctorSchedule;
