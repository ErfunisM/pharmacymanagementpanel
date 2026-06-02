const TotalCards = ({ total_name, total_amount, total_icon }) => {
  return (
    <div className="flex flex-col shadow-sm gap-4 sm:gap-6 w-full h-full rounded-2xl bg-white p-4 sm:p-5 md:p-[20px] transition-all duration-200 hover:shadow-md">
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col gap-1 sm:gap-2 md:gap-3">
          <span className="text-xs  text-gray-600 font-bold sm:text-sm md:text-[14px] ">
            {total_name}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            {Number(total_amount).toLocaleString("en-US")}
          </h2>
        </div>

        <img
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-[50px] md:h-[50px] object-contain"
          src={total_icon}
          alt={total_name}
        />
      </div>

      <div className="flex items-center gap-1 m-auto">
        <span className="text-green-500 text-xs sm:text-sm font-semibold">
          8.5%
        </span>
        <span className="text-xs sm:text-sm text-gray-400">
          Up from yesterday
        </span>
      </div>
    </div>
  );
};

export default TotalCards;
