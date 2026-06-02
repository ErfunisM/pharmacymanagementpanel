import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";

function sleep(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

const onSubmit = async () => {
  await sleep(2000);
};

const schema = z.object({
  clinicName: z.string().min(1, "Clinic Name Is Empty").min(3, "Error Text 3"),
  openHours: z.string().min(1, "Open Hours Is Empty").min(3, "Error Text 3"),
  location: z.string().min(1, "Location Is Empty").min(3, "Error Text 3"),
  facilities: z.string().min(1, "Facilities Is Empty").min(3, "Error Text 3"),
  googleMapLink: z
    .string()
    .min(1, "Google Map Link Is Empty")
    .min(3, "Error Text 3"),
  phoneNumber: z
    .string()
    .min(1, "Mobile Number Is Empty")
    .regex(/^09\d{9}$/, "Invalid Mobile Number"),
});
const FormClinicInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <form
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      className=" flex h-full flex-col justify-between items-center gap-10 "
    >
      <fieldset disabled={isSubmitting} className="flex justify-between gap-8">
        <div className="flex flex-col gap-8 w-full">
          {/* Clinic Name */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Clinic Name
            </label>
            <input
              {...register("clinicName")}
              type="text"
              className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
            />
            {errors?.clinicName && (
              <p className="font-bold text-[12px] text-red-600 ">
                {errors.clinicName.message}
              </p>
            )}
          </div>
          {/* Specialties Offered */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Specialties Offered
            </label>
            <select className="w-full h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          {/* Opening Hours */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Opening Hours
            </label>
            <input
              {...register("openHours")}
              type="text"
              className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1]  rounded-[5px]"
            />
            {errors?.openHours && (
              <p className="font-bold text-[12px] text-red-600 ">
                {errors.openHours.message}
              </p>
            )}
          </div>
          {/* Location */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Location
            </label>
            <input
              {...register("location")}
              type="text"
              className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1]  rounded-[5px]"
            />
            {errors?.location && (
              <p className="font-bold text-[12px] text-red-600 ">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full">
          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="tel"
              className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
            />{" "}
            {errors?.phoneNumber && (
              <p className="font-bold text-[12px] text-red-600 ">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          {/* Insurance Acceptance */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Insurance Acceptance
            </label>
            <select className="w-full h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          {/* Facilities */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Facilities
            </label>
            <input
              {...register("facilities")}
              type="text"
              className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1]  rounded-[5px]"
            />{" "}
            {errors?.facilities && (
              <p className="font-bold text-[12px] text-red-600 ">
                {errors.facilities.message}
              </p>
            )}
          </div>
          {/* Google Map Link */}
          <div className="flex flex-col gap-2">
            <label class="block text-sm font-bold text-gray-700">
              Google Map Link
            </label>
            <input
              {...register("googleMapLink")}
              type="text"
              className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
            />
            {errors?.googleMapLink && (
              <p className="font-bold text-[12px] text-red-600 ">
                {errors.googleMapLink.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>
      <button
        type="submit"
        class="w-50 py-2 rounded-md  text-white p-[20px] bg-red-500 transition"
      >
        {isSubmitting ? "Sending" : "Done"}
      </button>
    </form>
  );
};

export default FormClinicInfo;
