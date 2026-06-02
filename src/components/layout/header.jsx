import { format } from "date-fns";
import Avatar from "../common/avatar";
import TitleUser from "../common/TitleUser";

let newDate = new Date();

const Header = ({ onMenuClick, onDesktopMenuToggle }) => {
  return (
    <header className="w-full h-auto md:h-[92px] bg-white shadow-md flex flex-col-reverse gap-5 md:flex-row justify-between items-center px-4 sm:px-6 py-3 md:py-0 border-l-2 border-gray-200">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg bg-[#2D9CDB26] transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <button
          onClick={onDesktopMenuToggle}
          className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </button>

        <div>
          <TitleUser username="Erfan" />
          <span className="text-xs sm:text-sm text-gray-600">
            <span className="block sm:hidden">
              {format(newDate, "EEEE, MMM d")}
            </span>
            <span className="hidden sm:block md:hidden">
              {format(newDate, "EEE, MMM d, yyyy")}
            </span>
            <span className="hidden md:block">
              {format(newDate, "EEEE, MMMM d, yyyy")}
            </span>
          </span>
        </div>
      </div>

      <div className="flex gap-3 sm:gap-5 items-center">
        <div className="flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-[#2D9CDB26] transition-colors cursor-pointer">
          <img
            src="/icons/notification.svg"
            alt="notification"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <Avatar />
      </div>
    </header>
  );
};

export default Header;
