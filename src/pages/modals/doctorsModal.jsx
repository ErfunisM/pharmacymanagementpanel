import { Fragment, useState } from "react";
import SearchBox from "../../components/common/SearchBox";

const DoctorsModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((prev) => prev + 1);

  const handleDone = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Fragment>
      {step === 1 && (
        <form className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">Request a Doctor</h4>
            <SearchBox SearchPlaceholder="Search Doctor" />
          </div>
          <button
            type="submit"
            className="w-50 py-2 rounded-md mx-auto text-white p-[20px] bg-red-500 transition"
            onClick={nextStep}
          >
            Next
          </button>
        </form>
      )}
      {step === 2 && (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center flex-col gap-4">
            <img
              className="w-[50px] h-[50px]"
              src="/icons/body/Heart.svg"
              alt=""
            />
            <span className="font-bold">
              Your request has been sent to the doctor. We'll notify you once
              it's confirmed.
            </span>
          </div>
          <button
            type="button"
            className="w-50 py-2 rounded-md mx-auto text-white p-[20px] bg-red-500 transition"
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default DoctorsModal;
