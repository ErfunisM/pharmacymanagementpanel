import { useForm } from "react-hook-form";

function sleep(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}
const onSubmit = async () => {
  await sleep(2000);
  // submit handler placeholder
};

const PharmaciesForm = () => {
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
        <h4 className="font-bold">Add a Pharmacy</h4>
        <fieldset className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-8 w-full">
            <label className="block text-sm font-bold text-gray-700">
              Name
            </label>
            <select
              {...register("name")}
              className=" h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
            >
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

export default PharmaciesForm;
