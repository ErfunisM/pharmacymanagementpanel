import { useState, useRef, useEffect } from "react";
import { FILTER_OPTIONS } from "../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const Filter = ({ items, onFilter, onReset, selectedFilters }) => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const datePickerRef = useRef(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsDateOpen(false);
      }

      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedFilters.date) count++;
    if (selectedFilters.time) count++;
    if (selectedFilters.gender && selectedFilters.gender !== "All") count++;
    if (selectedFilters.status && selectedFilters.status !== "All") count++;
    if (selectedFilters.spec && selectedFilters.spec !== "All") count++;
    if (selectedFilters.depart && selectedFilters.depart !== "All") count++;
    if (selectedFilters.ins && selectedFilters.ins !== "All") count++;
    if (selectedFilters.branch && selectedFilters.branch !== "All") count++;
    return count;
  };

  const getSelectOptions = (item) => {
    const optionsMap = {
      [FILTER_OPTIONS.gender]: [
        { value: "All", label: "All Genders" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
      [FILTER_OPTIONS.status]: [
        { value: "All", label: "All Status" },
        { value: "Completed", label: "Completed" },
        { value: "Pending", label: "Pending" },
      ],
      [FILTER_OPTIONS.status2]: [
        { value: "All", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      [FILTER_OPTIONS.spec]: [
        { value: "All", label: "All Specialties" },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Dermatology", label: "Dermatology" },
      ],
      [FILTER_OPTIONS.depart]: [
        { value: "All", label: "All Departments" },
        { value: "Cardiology", label: "Cardiology" },
        { value: "Dermatology", label: "Dermatology" },
      ],
      [FILTER_OPTIONS.ins]: [
        { value: "All", label: "All Insurance" },
        { value: "Covered", label: "Covered" },
        { value: "Not Covered", label: "Not Covered" },
      ],
      [FILTER_OPTIONS.branch]: [
        { value: "All", label: "All Branches" },
        { value: "Riyadh", label: "Riyadh" },
        { value: "Jeddah", label: "Jeddah" },
        { value: "Median", label: "Median" },
      ],
    };
    return optionsMap[item] || [{ value: "All", label: "All" }];
  };

  const getCurrentValue = (item) => {
    const valueMap = {
      [FILTER_OPTIONS.gender]: selectedFilters.gender,
      [FILTER_OPTIONS.status]: selectedFilters.status,
      [FILTER_OPTIONS.status2]: selectedFilters.status,
      [FILTER_OPTIONS.spec]: selectedFilters.spec,
      [FILTER_OPTIONS.depart]: selectedFilters.depart,
      [FILTER_OPTIONS.ins]: selectedFilters.ins,
      [FILTER_OPTIONS.branch]: selectedFilters.branch,
    };
    return valueMap[item] || "All";
  };

  const getDisplayLabel = (item) => {
    const options = getSelectOptions(item);
    const currentValue = getCurrentValue(item);
    const selected = options.find((opt) => opt.value === currentValue);
    return selected?.label || "Select...";
  };

  const getDisplayDate = () => {
    if (!selectedFilters.date) return "Select Date";
    return selectedFilters.date;
  };

  const handleSelectChange = (item, value) => {
    const changeMap = {
      [FILTER_OPTIONS.gender]: (val) =>
        onFilter((prev) => ({ ...prev, gender: val })),
      [FILTER_OPTIONS.status]: (val) =>
        onFilter((prev) => ({ ...prev, status: val })),
      [FILTER_OPTIONS.status2]: (val) =>
        onFilter((prev) => ({ ...prev, status: val })),
      [FILTER_OPTIONS.spec]: (val) =>
        onFilter((prev) => ({ ...prev, spec: val })),
      [FILTER_OPTIONS.depart]: (val) =>
        onFilter((prev) => ({ ...prev, depart: val })),
      [FILTER_OPTIONS.ins]: (val) =>
        onFilter((prev) => ({ ...prev, ins: val })),
      [FILTER_OPTIONS.branch]: (val) =>
        onFilter((prev) => ({ ...prev, branch: val })),
    };
    changeMap[item]?.(value);
    setOpenDropdown(null);

    if (isMobile) {
      setIsFilterMenuOpen(false);
    }
  };

  const selectedDate = selectedFilters.date
    ? new Date(selectedFilters.date)
    : null;

  const renderField = (item) => {
    if (item === FILTER_OPTIONS.date) {
      return (
        <div className="relative w-full" ref={datePickerRef}>
          <button
            onClick={() => setIsDateOpen(!isDateOpen)}
            className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none text-left flex items-center justify-between font-bold text-black"
          >
            <span className="font-bold text-black">{getDisplayDate()}</span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${isDateOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDateOpen && (
            <div className="absolute z-50 mt-1 left-0 right-0 sm:right-auto">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  const formattedDate = date
                    ? dayjs(date).format("YYYY-MM-DD")
                    : "";
                  onFilter((prev) => ({ ...prev, date: formattedDate }));
                  setIsDateOpen(false);

                  if (isMobile) {
                    setIsFilterMenuOpen(false);
                  }
                }}
                onClickOutside={() => setIsDateOpen(false)}
                open={isDateOpen}
                inline
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
            </div>
          )}
        </div>
      );
    }

    if (item === FILTER_OPTIONS.time) {
      return (
        <div className="relative w-full">
          <button className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none text-left flex items-center justify-between font-bold text-black">
            <span className="font-bold text-black">Select Time</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      );
    }

    if (
      [
        FILTER_OPTIONS.gender,
        FILTER_OPTIONS.status,
        FILTER_OPTIONS.status2,
        FILTER_OPTIONS.spec,
        FILTER_OPTIONS.depart,
        FILTER_OPTIONS.ins,
        FILTER_OPTIONS.branch,
      ].includes(item)
    ) {
      const options = getSelectOptions(item);
      const displayLabel = getDisplayLabel(item);
      const isOpen = openDropdown === item;
      const currentValue = getCurrentValue(item);

      return (
        <div
          className="relative w-full"
          ref={(el) => (dropdownRefs.current[item] = el)}
        >
          <button
            onClick={() => setOpenDropdown(isOpen ? null : item)}
            className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none text-left flex items-center justify-between font-bold text-black"
          >
            <span className="font-bold text-black">{displayLabel}</span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-[160px]">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectChange(item, opt.value)}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                    currentValue === opt.value ? "bg-gray-100 font-bold" : ""
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const getFilterLabel = (item) => {
    const labels = {
      [FILTER_OPTIONS.date]: "Date",
      [FILTER_OPTIONS.time]: "Time",
      [FILTER_OPTIONS.gender]: "Gender",
      [FILTER_OPTIONS.status]: "Status",
      [FILTER_OPTIONS.spec]: "Specialty",
      [FILTER_OPTIONS.depart]: "Department",
      [FILTER_OPTIONS.ins]: "Insurance",
      [FILTER_OPTIONS.branch]: "Branch",
    };
    return labels[item] || item;
  };

  return (
    <>
      {!isMobile && (
        <div className="flex items-center justify-around shadow-sm text-black bg-white w-full rounded-[10px] p-0 h-full">
          <div className="flex items-center h-full px-[20px] py-0 border-r border-gray-300">
            <img src="../../../public/icons/body/Filter.svg" alt="filter" />
            <span className="text-sm font-semibold text-gray-700 mr-2">
              Filter By
            </span>
          </div>
          <div className="flex items-center gap-3 h-full">
            {items.map((item) => (
              <div
                className="flex items-center h-full border-r border-gray-300 last:border-r-0"
                key={item}
              >
                {renderField(item)}
              </div>
            ))}
          </div>
          <div className="flex items-center h-full px-[20px] py-0">
            <img
              src="../../../public/icons/body/Reset-Filter.svg"
              alt="reset"
            />
            <button
              onClick={onReset}
              className="font-bold px-3 py-2 text-red-600 rounded-lg text-sm transition cursor-pointer hover:bg-red-50"
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <div className="relative w-full">
          <button
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="w-full flex items-center justify-between bg-white shadow-sm rounded-[10px] px-4 py-3 transition-all"
          >
            <div className="flex items-center gap-2">
              <img
                src="../../../public/icons/body/Filter.svg"
                alt="filter"
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-700">Filter</span>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </div>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isFilterMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isFilterMenuOpen && (
            <div className="mt-2 mb-4 bg-white shadow-lg rounded-[10px] border border-gray-200">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item} className="p-4">
                    <div className="text-xs text-gray-500 mb-2">
                      {getFilterLabel(item)}
                    </div>
                    {renderField(item)}
                  </div>
                ))}
                <div className="p-4">
                  <button
                    onClick={() => {
                      onReset();
                      setIsFilterMenuOpen(false);
                    }}
                    className="w-full text-center text-red-600 font-bold py-2 hover:bg-red-50 rounded-lg transition"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Filter;
