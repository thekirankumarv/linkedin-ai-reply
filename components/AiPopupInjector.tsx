import { createRoot, Root } from "react-dom/client";
import AiButton from "./AiIcon";
import AIPopup from "./AIGeneratorPopup";

// Function to inject AI button into the LinkedIn message input
const injectAiButton = () => {
  const popupContainer = document.createElement("div");
  const iconContainer = document.createElement("div");
  iconContainer.id = "ai-icon";

  let popupRoot: Root | null = null;
  let iconRoot: Root | null = null;
  let isPopupOpen = false; // Tracks if the popup is open
  let isIconClicked = false; // Tracks if the icon was clicked

  // Function to add the AI button to the message input
  const addAiButton = () => {
    const messageInput = document.querySelector<HTMLDivElement>(
      "div.msg-form__contenteditable"
    );

    if (messageInput && !document.getElementById("ai-icon")) {
      messageInput.parentNode?.appendChild(iconContainer);

      if (!iconRoot) {
        iconRoot = createRoot(iconContainer);
        iconRoot.render(
          <AiButton onMouseDown={handleIconMouseDown} onClick={handleIconClick} />
        );
      }

      // Attach event listeners for showing and hiding the icon
      messageInput.addEventListener("focus", handleInputFocus);
      messageInput.addEventListener("blur", handleInputBlur);
    }
  };

  // Show the icon when the input is focused
  const handleInputFocus = () => {
    iconContainer.style.display = "block";
  };

  // Hide the icon when the input is blurred, allowing for click handling
  const handleInputBlur = () => {
    setTimeout(() => {
      if (!isPopupOpen && !isIconClicked) {
        iconContainer.style.display = "none";
      }
      isIconClicked = false; // Reset click state
    }, 100);
  };

  // Set click state when the icon is pressed down
  const handleIconMouseDown = () => {
    isIconClicked = true;
  };

  // Handle icon click to open the popup
  const handleIconClick = () => {
    if (!isPopupOpen) {
      isPopupOpen = true;
      document.body.appendChild(popupContainer);
      popupRoot = createRoot(popupContainer);

      const popupManager = () => {
        isPopupOpen = false;
        popupRoot?.unmount(); // Unmount the popup
        document.body.removeChild(popupContainer); // Remove the popup from the DOM
        iconContainer.style.display = "block"; // Show the icon again
      };

      popupRoot.render(<AIPopup popupManager={popupManager} />);
      iconContainer.style.display = "none"; // Hide the icon while the popup is open
    }
  };

  // Debounce the addAiButton function to prevent excessive calls
  const debouncedAddAiButton = debounce(addAiButton, 300);

  // Set up MutationObserver to watch for DOM changes and call addAiButton
  const observer = new MutationObserver(debouncedAddAiButton);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial call to add the AI button
  addAiButton();

  // Cleanup function to disconnect the observer and remove elements
  return () => {
    observer.disconnect();
    popupRoot?.unmount();
    iconRoot?.unmount();
    popupContainer.remove();
    iconContainer.remove();
  };
};

// Debounce utility function to limit the rate of function calls
const debounce = (func: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};

export default injectAiButton;
