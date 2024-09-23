import React, { useState } from "react";

const App: React.FC = () => {
  const [responseCount, setResponseCount] = useState<number>(0); // Count of AI responses generated
  const [isDisabled, setIsDisabled] = useState<boolean>(false); // State to track if the extension is disabled

  // Toggle the disabled state of the extension
  const toggleDisable = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <div className="p-4 bg-blue-800 text-white w-96 h-full rounded-lg">
      <h1 className="text-lg font-semibold">LinkedIn AI Reply</h1>

      {isDisabled ? (
        <p className="mt-2 text-red-400">
          The extension is currently disabled.
        </p>
      ) : (
        <>
          <p className="mt-2">
          A Chrome extension that runs on LinkedIn and assists users in generating replies to messages.
          </p>
         
          <p className="mt-2 font-bold">
            Response Count: {responseCount}
          </p>
        </>
      )}

      <div className="flex items-center mt-4">
        <span className="mr-2">{isDisabled ? "Disabled" : "Enabled"}</span>
        <button
          className={`w-10 h-6 rounded-full ${
            isDisabled ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={toggleDisable}
          aria-label={isDisabled ? "Enable extension" : "Disable extension"}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full transition-transform ${
              isDisabled ? "translate-x-0" : "translate-x-4"
            }`}
          />
        </button>
      </div>
      
    </div>
  );
};

export default App;
