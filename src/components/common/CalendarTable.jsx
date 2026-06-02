import React, { useState } from "react";
import Modal from "react-modal";
import CalendarTableForm from "../../pages/forms/calendarTableForm";

const CalendarTable = ({ isModalOpen = false }) => {
  //
  const [modalIsOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [selectedDay, setSelectedDay] = useState("SUN");

  const hours = [
    "08 AM",
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
    "06 PM",
    "07 PM",
    "08 PM",
  ];

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <div
      className="flex flex-col border border-gray-300 rounded-[30px] overflow-auto bg-white"
      style={{
        position: "relative",
        zIndex: isModalOpen ? 0 : 1,
        isolation: "isolate",
      }}
    >
      <div className="flex justify-center border-b border-gray-300 py-3">
        <div className="flex gap-3">
          {weekDays.map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`
                px-5 py-2 text-center font-bold transition-all duration-200 rounded-md text-sm cursor-pointer hover:bg-[#199A8EB2] hover:text-white hover:rounded-[60px]
                ${selectedDay === day ? "bg-[#199A8E] text-white rounded-[60px]" : ""}
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div
        className="overflow-x-auto overflow-y-auto"
        style={{ height: "calc(100vh - 120px)", minHeight: "500px" }}
      >
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-gray-100">
            <tr className="h-12">
              <th
                className="border border-gray-300 text-center bg-white text-gray-600 font-bold text-sm sticky top-0"
                style={{
                  width: "45px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
              ></th>
              <th
                className="border border-gray-300 text-center bg-[#FAFAFA] text-gray-600 font-bold text-sm sticky top-0"
                style={{
                  width: "120px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
              >
                Name
              </th>
              <th
                className="border border-gray-300 text-center bg-white text-gray-600 font-bold text-sm sticky top-0"
                style={{
                  width: "120px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
              >
                Room 1
              </th>
              <th
                className="border border-gray-300 text-center bg-white text-gray-600 font-bold text-sm sticky top-0"
                style={{
                  width: "120px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
              >
                Any name
              </th>
              <th
                className="border border-gray-300 text-center bg-white text-gray-600 font-bold text-sm sticky top-0"
                style={{
                  width: "120px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
              >
                Reception
              </th>
              <th
                className="border border-gray-300 text-center bg-white text-gray-600 font-bold text-sm sticky top-0"
                style={{
                  width: "120px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
              >
                &nbsp;
              </th>
              <th
                className="border border-gray-300 text-center bg-white text-gray-600 font-bold text-sm sticky top-0"
                style={{
                  width: "120px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
              >
                &nbsp;
              </th>
              <th
                className="border border-gray-300 text-center bg-[#FAFAFA] text-[#EC2348] font-bold text-sm cursor-pointer sticky top-0"
                style={{
                  width: "120px",
                  zIndex: isModalOpen ? 1 : 10,
                }}
                onClick={openModal}
              >
                Add a Capacity
              </th>
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hourIndex) => (
              <React.Fragment key={hourIndex}>
                <tr
                  style={{ height: "40px" }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    rowSpan={2}
                    style={{ height: "80px", width: "45px" }}
                    className="border border-gray-300 text-center bg-white text-gray-700 align-middle text-sm"
                  >
                    {hour}
                  </td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 bg-[#FAFAFA] text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 bg-[#FAFAFA] text-center text-sm"
                  ></td>
                </tr>
                <tr
                  style={{ height: "40px" }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 bg-[#FAFAFA] text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 text-sm"
                  ></td>
                  <td
                    style={{ width: "120px" }}
                    className="border border-gray-300 bg-[#FAFAFA] text-center text-sm"
                  ></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        className="absolute inset-[40px] rounded-[30px] bg-white shadow-2xl p-[40px] m-auto w-[50%] h-[75%] outline-none
                         max-lg:!inset-[20px] max-lg:!rounded-[20px] max-lg:!p-4 max-lg:!w-auto max-lg:!h-auto max-lg:!m-0"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            zIndex: 10000,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            zIndex: 10001,
          },
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <button
              className="font-bold cursor-pointer text-gray-500 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <div>
            <CalendarTableForm />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarTable;
