import { useMemo } from "react";
import { SIDEBAR_MENU_ITEMS } from "../../constants";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onClose, isCollapsed }) => {
  const location = useLocation();
  const activeClass = useMemo(() => {
    const found = SIDEBAR_MENU_ITEMS.find((m) => m.link === location.pathname);
    return found ? found.item : "";
  }, [location.pathname]);

  return (
    <aside
      className={`
      h-full bg-[#FFFFFF] shadow-md flex flex-col
      transition-all duration-300 ease-in-out
    `}
    >
      {" "}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="بستن منو"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <div className="pt-6 pb-8">
        {isCollapsed ? (
          <div className="flex justify-center">
            <h2 className="text-2xl text-center font-bold text-[#000000]">A</h2>
          </div>
        ) : (
          <h2 className="text-2xl text-center font-bold text-[#000000]">
            Afia
            <span className="font-light">Tech</span>
          </h2>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto py-6">
        <div
          className={`flex flex-col gap-8 space-y-4 ${isCollapsed ? "px-2" : "px-6"}`}
        >
          {SIDEBAR_MENU_ITEMS.map((menu) => (
            <Link
              to={menu.link}
              onClick={() => {
                if (onClose) onClose();
              }}
              className={`
                flex font-bold text-[14px] text-[#000000] items-center gap-2 p-2 rounded-[5px] transition-all duration-200
                ${activeClass === menu.item ? "bg-[#199A8E] text-white" : "hover:bg-gray-100"}
                ${isCollapsed ? "justify-center" : "justify-start"}
              `}
              key={menu.item}
              title={isCollapsed ? menu.item : ""}
            >
              <img
                src={menu.src}
                alt={menu.item}
                className={`w-5 h-5 ${activeClass === menu.item ? "brightness-0 invert" : ""}`}
              />
              {!isCollapsed && <span>{menu.item}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
