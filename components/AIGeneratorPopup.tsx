import React, { useState, useCallback, useEffect } from "react";
import CustomButton from "./ReusableButton";
import { fetchAIResponse } from "../tools/aiResponseFetcher"; // Importing the API utility to fetch AI responses
import generateIcon from "../public/icon/Generate.svg"; // Update the path if necessary
import insertIcon from "../public/icon/Insert.svg"; // Import other icons similarly
import regenerateIcon from "../public/icon/Regenerate.svg"; // Import if needed

// Props interface for the AI popup component
interface AIPopupProps {
  popupManager: () => void; // Function to close the popup
}

const AIPopup: React.FC<AIPopupProps> = ({ popupManager }) => {
  const [userPrompt, setUserPrompt] = useState<string>(""); // Stores the user's input
  const [aiResponse, setAIResponse] = useState<string>(""); // Stores the AI-generated response
  const [isGenerating, setIsGenerating] = useState<boolean>(false); // Tracks whether the AI response is being generated
  const [error, setError] = useState<string>(""); // Tracks any error message during the response generation

  // Function to generate AI response based on user input
  const generateAIResponse = useCallback(async () => {
    if (!userPrompt) return; // Prevent generation if input is empty

    setIsGenerating(true);
    setError(""); // Clear any previous errors
    try {
      const response = await fetchAIResponse(userPrompt); // Fetch AI response
      setAIResponse(response); // Set the response to state
    } catch (err: any) {
      console.error("Failed to generate AI response:", err);
      setError("An error occurred while generating the response."); // Handle errors
    } finally {
      setIsGenerating(false); // Reset loading state
    }
  }, [userPrompt]);

  // Inserts the AI response into the LinkedIn message input field
  const insertResponse = () => {
    const messageInput = document.querySelector("div.msg-form__contenteditable p");
    const inputContainer = document.querySelector("div.msg-form__contenteditable");
    const placeholderElement = document.querySelector("div.msg-form__placeholder");

    if (messageInput && inputContainer && placeholderElement) {
      messageInput.innerHTML = aiResponse; // Set AI response in the message input
      inputContainer.setAttribute("aria-label", "");
      placeholderElement.setAttribute("aria-hidden", "false");
      placeholderElement.setAttribute("data-placeholder", "");
      placeholderElement.textContent = "";

      // Clear inputs and close popup after inserting the response
      setUserPrompt("");
      setAIResponse("");
      popupManager();
    } else {
      console.error("One or more elements not found:", { messageInput, inputContainer, placeholderElement });
    }
  };

  // Clear error message after 3 seconds if an error occurred
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={popupManager} // Close the popup on outside click
      role="dialog"
      aria-labelledby="ai-popup"
    >
      <div
        className="absolute w-[500px] overflow-hidden bg-white shadow-lg p-4 gap-4 rounded-xl z-50"
        style={{ top: '210px', right: '310px' }} 
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner div click
      >
        <h2 id="ai-popup" className="sr-only">
          AI Response Generator
        </h2>
        {error && <div className="text-red-600">{error}</div>} {/* Display error message */}
        
        {/* Display AI-generated response */}
        {aiResponse && (
          <div className="mt-4">
            <div className="w-full flex justify-end">
              <div className="max-w-[75%] p-2 mb-6 bg-[#dfe1e7] rounded-xl text-[#666d80] text-2xl leading-9">
                {userPrompt} {/* Display the user prompt */}
              </div>
            </div>
            <div className="max-w-[75%] p-2 bg-blue-100 rounded-xl text-[#666d80] text-2xl leading-9 mb-6">
              {aiResponse} {/* Display the AI response */}
            </div>
          </div>
        )}

        {/* Input for user prompt */}
        <input
          className="w-full max-w-[818px] max-h-[61px] p-3 rounded-lg mb-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Your Prompt"
          value={aiResponse ? "" : userPrompt} // Clear input field after response generation
          onChange={(e) => setUserPrompt(e.target.value)} // Set user prompt
          aria-label="User Prompt"
        />

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          {aiResponse ? (
            <>
              <CustomButton
                label="Insert"
                icon={insertIcon}
                onClick={insertResponse} // Insert AI response into message box
                className="custom-button max-w-[129px] bg-white text-[#666d80]"
              />
              <CustomButton
                label="Regenerate"
                icon={regenerateIcon}
                onClick={generateAIResponse} // Regenerate AI response
                isLoading={isGenerating}
                className="bg-blue-500 text-white"
              />
            </>
          ) : (
            <CustomButton
              label="Generate"
              icon={generateIcon}
              onClick={generateAIResponse} // Generate AI response
              isLoading={isGenerating}
              disabled={!userPrompt} // Disable button if user prompt is empty
              className="bg-blue-500 text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPopup;
