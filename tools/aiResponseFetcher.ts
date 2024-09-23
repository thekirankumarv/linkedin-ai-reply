export const fetchAIResponse = async (input: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simulate an API call with a timeout
    setTimeout(() => {
      if (input) {
        // Resolve with a predefined AI response if input is valid
        resolve(
          "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
        );
      } else {
        // Reject the promise if the input is invalid
        reject(new Error("Invalid input"));
      }
    }, 1000); // Delay to simulate response time
  });
};
