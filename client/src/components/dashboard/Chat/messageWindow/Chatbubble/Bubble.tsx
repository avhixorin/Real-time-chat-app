import React from "react";

interface BubbleProps {
  message: string;
  sender: string | undefined;
}

const Bubble: React.FC<BubbleProps> = ({ message, sender }) => {
  const isSenderOther = sender === "other";
  return (
    <div className="flex items-start gap-2.5">
      {isSenderOther ? (
        <>
          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Bonnie Green
              </span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {message}
              </p>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              11:46
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-ee-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {message}
              </p>
            </div>

            <div className="flex justify-between items-center space-x-2 rtl:space-x-reverse px-2">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                11:46
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Delivered
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Bubble;
