// popup.js

let userToken;

function generateUserToken() {
  // Implement your token generation logic here
  // For simplicity, we'll use a random string
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function addLoginListener() {
  console.log("addLoginListener");

  const loginButton = document.getElementById("loginButton");

  loginButton.addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Perform your authentication logic here
    // For simplicity, let's assume a successful login and generate a token
    userToken = generateUserToken();

    // Convert the token to a string before sending it to the background script
    const tokenString = JSON.stringify(userToken);

    // Send a message to the background script to save the token
    chrome.runtime.sendMessage(
      { action: "saveToken", token: tokenString },
      function (response) {
        console.log("Popup script response:", response);

        console.log("Closing popup...");
        window.close();
      }
    );
  });
}

function renderAuthPage() {
  console.log("renderAuthPage");

  // Create container div
  var popupContainer = document.createElement("div");
  popupContainer.className = "popup-container";

  // Create heading h1
  var heading = document.createElement("h1");
  heading.textContent = "Login";

  // Create email input
  var emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.id = "email";
  emailInput.placeholder = "Email";

  // Create password input
  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.placeholder = "Password";

  // Create login button
  var loginButton = document.createElement("button");
  loginButton.id = "loginButton";
  loginButton.textContent = "Login";

  // Append elements to container
  popupContainer.appendChild(heading);
  popupContainer.appendChild(emailInput);
  popupContainer.appendChild(passwordInput);
  popupContainer.appendChild(loginButton);

  // Append container to the body or any other element you want
  document.body.appendChild(popupContainer);

  addLoginListener();
}

function renderMainPage() {
  console.log("renderMainPage");

  // Create container div
  var popupContainer = document.createElement("div");
  popupContainer.className = "popup-container";

  // Create heading h1
  var heading = document.createElement("h1");
  heading.textContent = "Welcome";

  // Append elements to container
  popupContainer.appendChild(heading);

  // Append container to the body or any other element you want
  document.body.appendChild(popupContainer);
}

function renderPage() {
  // Verify User Token and render page accordingly
  chrome.storage.local.get(["token"]).then((result) => {
    console.log("result", result);

    if (result.token) {
      renderMainPage();
    } else {
      renderAuthPage();
    }
  });
}

renderPage();
