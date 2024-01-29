// background.js

// Function to check if the stored token is valid
function isTokenValid(token) {
    // Implement your token validation logic here
    // For simplicity, let's assume the token is always valid for demonstration purposes
    return true;
  }
  
  // Function to verify the user token
   function verifyUserToken() {
    console.log("salut");
    // Retrieve the token from local storage
     chrome.storage.local.get(['token']).then((result)=> {
      const tokenString = result.token;
      console.log(tokenString);
      console.log(result);
  
      // Check if the token is available
      if (tokenString) {
        // Convert the token string back to an object
        const tokenObject = JSON.parse(tokenString);
  
        // Use the token in your token verification logic
        if (isTokenValid(tokenObject)) {
          // If token is valid, open the popup
          chrome.windows.create({
            type: 'popup',
            url: 'popup.html',
            width: 400,
            height: 300
          });
          return;
        }
      } 
        // If token is not found or not valid
        chrome.windows.create({
          type: 'popup',
          url: 'auth.html',
          width: 400,
          height: 300
        });
      
    });
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'saveToken') {
      const tokenString = JSON.stringify(request.token);
  
      // Save the token to local storage
      chrome.storage.local.set({ token: tokenString }).then (()=> {
        console.log('Token saved:', request.token);
        sendResponse({ success: true });
      });
      return true; // Indicates that the response will be sent asynchronously
    }
  });
  
  verifyUserToken();
  setInterval(verifyUserToken, 60000); // Check every 1 minute

  