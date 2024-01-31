// background.js

// Function to check if the stored token is valid
function isTokenValid(token) {
  // Implement your token validation logic here
  // For simplicity, let's assume the token is always valid for demonstration purposes
  return true;
}

// Function to verify the user token
function verifyUserToken() {

  // Retrieve the token from local storage
  chrome.storage.local.get(["token"]).then((result) => {
    const tokenString = result.token;

    // Check if the token is available
    if (tokenString) {
      // Convert the token string back to an object
      const tokenObject = JSON.parse(tokenString);

      if (isTokenValid(tokenObject)) {
        // If token is valid, do nothing
        return;
      }
    }

    // If token is not found or not valid, make user login again
    chrome.storage.local.remove("token"); //TODO: refactor based on AC
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "saveToken") {
    const tokenString = JSON.stringify(request.token);

    // Save the token to local storage
    chrome.storage.local.set({ token: tokenString }).then(() => {
      console.log("Token saved:", request.token);
      sendResponse({ success: true });
    });

    return true; // Indicates that the response will be sent asynchronously
  }
});

verifyUserToken();
setInterval(verifyUserToken, 60000); // Check every 1 minute
