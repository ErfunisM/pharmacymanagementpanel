import { useState, useEffect } from "react";

const TableList = ({ header, body, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = body?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((body?.length || 0) / itemsPerPage);

  // removed isMobile state and resize listener (layout handled by CSS breakpoints)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextMobileCard = () => {
    if (currentMobileIndex < (body?.length || 0) - 1) {
      setCurrentMobileIndex(currentMobileIndex + 1);
    }
  };

  const prevMobileCard = () => {
    if (currentMobileIndex > 0) {
      setCurrentMobileIndex(currentMobileIndex - 1);
    }
  };

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setCurrentPage(1);
    setCurrentMobileIndex(0);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [body]);

  const getStatusColor = (status) => {
    const statusColors = {
      Confirmed: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Cancelled: "bg-red-100 text-red-800",
      Completed: "bg-blue-100 text-blue-800",
      All: "bg-gray-100 text-gray-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const formatValue = (key, value) => {
    if (!value && value !== 0) return "—";

    if (key.toLowerCase().includes("status")) {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}
        >
          {value}
        </span>
      );
    }

    if (key.toLowerCase().includes("date") && value) {
      return value;
    }

    return value;
  };

  if (!body || body.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500 text-lg">No data found</p>
      </div>
    );
  }

  const currentMobileItem = body?.[currentMobileIndex];

  return (
    <div className="w-full">
      {/* DeskTop Style */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-2xl shadow-sm">
          <table className="w-full bg-white text-sm">
            <thead className="border-b-1 border-gray-200">
              <tr>
                {header.map((item, index) => (
                  <th
                    key={index}
                    className="text-center p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  {Object.values(item).map((value, colIndex) => {
                    const key = Object.keys(item)[colIndex];
                    return (
                      <td
                        key={colIndex}
                        className="text-center p-3 sm:p-4 text-gray-600 text-sm whitespace-nowrap"
                      >
                        {formatValue(key, value)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr className="bg-[#FFFFFF]">
                <td colSpan={header.length} className="py-3 px-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="text-sm text-gray-600">
                      Showing {body.length > 0 ? indexOfFirstItem + 1 : 0} of{" "}
                      {Math.min(indexOfLastItem, body.length)}{" "}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className={`
                            px-4 py-1.5 rounded-tl-lg rounded-bl-lg text-sm font-medium transition-all duration-200
                            flex items-center gap-1
                            ${
                              currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                            }
                          `}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className={`
                            px-4 py-1.5 rounded-tr-lg rounded-br-lg text-sm font-medium transition-all duration-200
                            flex items-center gap-1
                            ${
                              currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                            }
                          `}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Mobile Style */}
      <div className="block md:hidden">
        {currentMobileItem && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {Object.entries(currentMobileItem).map(
                ([key, value], colIndex) => (
                  <div key={colIndex} className="flex justify-between p-4">
                    <span className="font-semibold text-gray-700 text-sm">
                      {header[colIndex]}:
                    </span>
                    <div className="text-gray-600 text-sm text-left">
                      {formatValue(key, value)}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {body.length > 1 && (
          <div className="flex items-center justify-between w-1/2 m-auto p-5">
            <button
              onClick={prevMobileCard}
              disabled={currentMobileIndex === 0}
              className={`
                flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center justify-center gap-2
                ${
                  currentMobileIndex === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                }
              `}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextMobileCard}
              disabled={currentMobileIndex === body.length - 1}
              className={`
                flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                flex items-center justify-center gap-2
                ${
                  currentMobileIndex === body.length - 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm"
                }
              `}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableList;
