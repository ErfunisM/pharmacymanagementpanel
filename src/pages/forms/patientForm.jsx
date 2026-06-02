import React, { useState } from "react";
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
  patientName: z.string().min(1, "Clinic Name Is Empty").min(3, "Error Text 3"),
  email: z.string().min(1, "Email Empty").min(3, "Error Text 3"),
  nationalID: z
    .string()
    .trim()
    .min(1, "National ID Is Empty")
    .length(8, "National ID must be 8 digits")
    .regex(/^\d{8}$/, "Digits only"),
  age: z.string().min(1, "Age Empty").max(50, "Too Old"),
  phoneNumber: z
    .string()
    .min(1, "Mobile Number Is Empty")
    .regex(/^09\d{9}$/, "Invalid Mobile Number"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  underlyingDisease: z.string().optional(),
  insuranceCompany: z.string().optional(),
  insuranceCategory: z.string().optional(),
  insuranceId: z.string().optional(),
  insuranceExpiration: z.string().optional(),
  surgeryHistory: z.string().optional(),
  medications: z.string().optional(),
});

const PatientForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex h-full flex-col justify-between "
    >
      <div className="flex flex-col gap-4">
        <h4 className="font-bold">Add a patient</h4>
        <fieldset
          disabled={isSubmitting}
          className="flex justify-between gap-8"
        >
          <div className="flex flex-col gap-8 w-full">
            {/* Patient Name */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Patient Name
              </label>
              <input
                {...register("patientName")}
                type="text"
                className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
              />
              {errors?.patientName && (
                <p className="font-bold text-[12px] text-red-600 ">
                  {errors.patientName.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Email (Optional)
              </label>
              <input
                {...register("email")}
                type="text"
                className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1]  rounded-[5px]"
              />
              {errors?.email && (
                <p className="font-bold text-[12px] text-red-600 ">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Gender */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Gender
              </label>
              <select
                {...register("gender")}
                className="w-full h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors?.gender && (
                <p className="font-bold text-[12px] text-red-600 ">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full">
            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
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

            {/* NationalID */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                National ID
              </label>
              <input
                {...register("nationalID")}
                type="text"
                inputMode="numeric"
                maxLength={8}
                autoComplete="off"
                className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1]  rounded-[5px]"
              />
              {errors?.nationalID && (
                <p className="font-bold text-[12px] text-red-600 ">
                  {errors.nationalID.message}
                </p>
              )}
            </div>
            {/* Age */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Age (Optional)
              </label>
              <input
                {...register("age")}
                type="text"
                className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
              />
              {errors?.age && (
                <p className="font-bold text-[12px] text-red-600 ">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Insurance */}
          </div>
        </fieldset>
        <div className="flex flex-col gap-5 mt-4 pt-2 ">
          <span className="text-sm font-bold text-gray-700">Insurance</span>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showAdditionalFields}
              onChange={(e) => setShowAdditionalFields(e.target.checked)}
              className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
            />
            <span className="text-sm font-bold text-gray-700">
              Does the patient have insurance?
            </span>
          </label>
        </div>
        {showAdditionalFields && (
          <div className="grid grid-cols-2 gap-4 mt-4 p-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Company Name
              </label>
              <select
                {...register("insuranceCompany")}
                className="w-full h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
              >
                <option value="Company Name 1">Company Name 1</option>
                <option value="Company Name 2">Company Name 2</option>
                <option value="Company Name 3">Company Name 3</option>
                <option value="Company Name 4">Company Name 4</option>
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Category
              </label>
              <select
                {...register("insuranceCategory")}
                className="w-full h-[40px] flex items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
              >
                <option value="Category Name 1">Category Name 1</option>
                <option value="Category Name 2">Category Name 2</option>
                <option value="Category Name 3">Category Name 3</option>
                <option value="Category Name 4">Category Name 4</option>
              </select>
            </div>

            {/* Insurance ID  */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Insurance ID
              </label>
              <input
                {...register("insuranceId")}
                type="text"
                className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
              />
            </div>

            {/* Insurance expiration */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-bold text-gray-700">
                Insurance expiration
              </label>
              <input
                {...register("insuranceExpiration")}
                type="date"
                className="w-full flex h-auto items-center shadow-sm justify-center text-black p-2 bg-[#f1f1f1] rounded-[5px]"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-50 py-2 rounded-md mx-auto text-white p-[20px] bg-red-500 transition mt-6"
      >
        {isSubmitting ? "Sending" : "Done"}
      </button>
    </form>
  );
};

export default PatientForm;
