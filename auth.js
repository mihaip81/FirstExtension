// popup.js

let userToken;

document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('loginButton');

  //verific daca am deja token-ul, daca nu-l am, creez prin js pagina de login.
  loginButton.addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform your authentication logic here
    // For simplicity, let's assume a successful login and generate a token
    userToken = generateUserToken();

    // Convert the token to a string before sending it to the background script
    const tokenString = JSON.stringify(userToken);

    // Send a message to the background script to save the token
    chrome.runtime.sendMessage({ action: 'saveToken', token: tokenString }, function (response) {
      console.log('Background script response:', response);
    });

    // Close the popup after sending the message
    console.log('Closing popup...');
    window.close();
  });

  function generateUserToken() {
    // Implement your token generation logic here
    // For simplicity, we'll use a random string
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
});
