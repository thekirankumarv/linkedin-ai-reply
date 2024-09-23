import React from "react";
import magicIcon from "../public/icon/MagicIcon.svg"; // Importing the magic icon for the AI feature

// Interface to define the props for the AiButton component
interface AiButtonProps {
  onClick: () => void; // Function triggered when the button is clicked
  onMouseDown?: () => void; // Optional function for mouse down event
}

// Functional component for AI Button Icon
const AiButton: React.FC<AiButtonProps> = ({ onClick, onMouseDown }) => (
  <div
    className="absolute right-0 bottom-0 cursor-pointer text-white p-1 rounded inline-flex items-center"
    onClick={onClick}
    aria-label="AI Assistant"
    onMouseDown={onMouseDown}
  >
    <img src={magicIcon} alt="AI Assistant Icon" className="w-[32px] h-[32px]" />
  </div>
);

export default AiButton;
