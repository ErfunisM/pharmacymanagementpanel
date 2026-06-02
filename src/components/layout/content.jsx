import { useState } from "react";
import React from "react";
import Modal from "react-modal";

const Content = ({ children, title, buttonTitle, modal, modalTitle }) => {
  const [modalIsOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center h-16 mb-10">
        <h2 className="text-1xl font-bold p-4">{title}</h2>
        {buttonTitle && (
          <button
            onClick={openModal}
            className="flex items-center justify-center text-white p-[20px] bg-red-500 w-fit h-1/2 rounded-[10px] cursor-pointer gap-3"
          >
            <img src="../../../public/icons/body/plus.svg" alt="plus" />
            {buttonTitle}
          </button>
        )}
      </div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { isModalOpen: modalIsOpen });
        }
        return child;
      })}

      <Modal
        className="absolute inset-[40px] rounded-[30px] bg-white shadow-2xl p-[40px] m-auto w-[50%] h-[75%] outline-none
                   max-lg:!inset-[20px] max-lg:!rounded-[20px] max-lg:!p-4 max-lg:!w-auto max-lg:!h-auto max-lg:!m-0"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            zIndex: 10000,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            zIndex: 10001,
          },
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{modalTitle}</p>
            <button
              className="font-bold cursor-pointer text-gray-500 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mt-4">
            {typeof modal === "function"
              ? modal(closeModal)
              : modal &&
                React.cloneElement(modal, {
                  onClose: closeModal,
                  isModalOpen: modalIsOpen,
                })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Content;
