import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";

function sleep(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}
const onSubmit = async (data) => {
  await sleep(2000);
};

const schema = z.object({
  room: z.string().min(1, "Room Name Is Empty").min(3, "Error Text 3"),
});

const ScheduleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      className=" flex h-full flex-col justify-between "
    >
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">Add a staff member</h4>
        <fieldset className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-8 w-full">
            <label class="block text-sm font-bold text-gray-700">Room</label>
            <input
              {...register("room")}
              type="text"
              className=" flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
            />
            {errors?.room && (
              <p className="font-bold text-[12px] text-red-600 ">
                {errors.room.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-8 w-full">
            <label class="block text-sm font-bold text-gray-700">
              Specialitiy
            </label>
            <select className=" h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]">
              <option>All</option>
              <option>O-1</option>
              <option>O-2</option>
              <option>O-3</option>
            </select>
          </div>
        </fieldset>
      </div>
      <button
        type="submit"
        className="w-50 py-2 rounded-md mx-auto  text-white p-[20px] bg-red-500 transition"
      >
        {isSubmitting ? "Sending" : "Done"}
      </button>
    </form>
  );
};

export default ScheduleForm;
