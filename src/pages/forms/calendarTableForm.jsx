import { useForm } from "react-hook-form";

function sleep(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}
const onSubmit = async () => {
  await sleep(2000);
  // submit handler placeholder
};

const CalendarTableForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col justify-between"
    >
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">Add a time block</h4>
        <fieldset className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-8 w-full">
            <label className="block text-sm font-bold text-gray-700">
              Doctor
            </label>
            <select
              {...register("name")}
              className="h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px] w-full"
            >
              <option>All</option>
              <option>O-1</option>
              <option>O-2</option>
              <option>O-3</option>
            </select>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <label className="block text-sm font-bold text-gray-700">
              Date and Time
            </label>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <select
                {...register("date")}
                className="h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px] w-full sm:w-1/3"
              >
                <option>Select Date</option>
                <option>2024-01-01</option>
                <option>2024-01-02</option>
                <option>2024-01-03</option>
              </select>

              <select
                {...register("startTime")}
                className="h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px] w-full sm:w-1/3"
              >
                <option>Start Time</option>
                <option>8:00 AM</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
              </select>

              <select
                {...register("endTime")}
                className="h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px] w-full sm:w-1/3"
              >
                <option>End Time</option>
                <option>8:00 AM</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <input type="checkbox" />
            <p>All day</p>
          </div>

          <div className="flex flex-col gap-8 w-full">
            <label className="block text-sm font-bold text-gray-700">
              Add Description
            </label>
            <textarea
              {...register("description")}
              className="w-full h-32 p-3 bg-[#f1f1f1] rounded-[5px]"
              placeholder="Write Here"
            />
          </div>
        </fieldset>
      </div>

      <div className="mt-8 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[120px] py-2.5 px-6 rounded-md mx-auto text-white bg-red-500 hover:bg-red-600 transition font-medium text-sm sm:text-base disabled:opacity-50 block"
        >
          {isSubmitting ? "Sending..." : "Done"}
        </button>
      </div>
    </form>
  );
};

export default CalendarTableForm;
