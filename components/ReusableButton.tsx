import React from "react";

// Props interface for the CustomButton component
interface CustomButtonProps {
  label: string; // Text label for the button
  icon: string; // Icon to be displayed on the button
  onClick: () => void; // Click handler function
  isLoading?: boolean; // Optional: Indicates if the button is in a loading state
  disabled?: boolean; // Optional: Disables the button if true
  className?: string; // Optional: Additional CSS classes for styling
}

// CustomButton component with support for loading and disabled states
const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  icon,
  onClick,
  isLoading = false, // Default to false if not provided
  disabled = false, // Default to false if not provided
  className = "", // Empty string as default className
}) => {
  return (
    <button
      className={`max-w-[190px] max-h-[53px] px-5 py-2 rounded-lg mb-2 inline-flex items-center justify-center ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading} // Disable button if either loading or disabled
      aria-label={label} // Accessibility label for screen readers
    >
      {isLoading ? (
        "Loading..." // Display 'Loading...' text if the button is in the loading state
      ) : (
        <>
          {/* Display the icon and label when not loading */}
          <img src={icon} alt={`${label} Icon`} className="w-6 h-6 mr-2" />
          {label}
        </>
      )}
    </button>
  );
};

export default CustomButton;
