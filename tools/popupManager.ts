export const popupManager = (backdrop: HTMLDivElement, popup: HTMLDivElement) => {
  // Remove the popup and its backdrop from the DOM
  popup.remove();
  backdrop.remove();
};
