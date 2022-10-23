const api_url = "http://localhost:7000";

const signupRoute = "/auth/signup";
const signinRoute = "/auth/login";

// alert(api_url + siginRoute);

console.log(api_url + signinRoute);

// reference the submit buttom from the dom
const signupBtn = document.querySelector(".btn");
// const signupBtn =document.getElementbyId("signupBtn")

const signupForm = document.querySelector("#signupForm");

const message = document.querySelector("#msg");

const handleSignup = async (e) => {
  // prevents the browser from reloading upon submission. (e) can be (evt) or (event)in full
  e.preventDefault();

  message.innerText = "Signing up...";
  message.className = "submit";

  const userData = {
    userName: e.target.userName.value,
    email: e.target.email.value,
    password: e.target.password.value,
    confirm_Password: e.target.password.value,
  };

  console.log(userData);
  // sends data to the ser to process

  try {
    // resolves fetch promise

    const res = await fetch(api_url + signupRoute, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });

    const jsonResponse = await res.json();

    message.innerText = jsonResponse.message;
    message.className = jsonResponse.success ? "success" : "error";
    //   previews response in the console.
    console.log(jsonResponse);

    if (jsonResponse.success) {
      setTimeout(() => {
        window.location.pathname = "/login.html";
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }

  //   gets the users input from the form
};

//   add event listner to the signup button
signupForm.addEventListener("submit", handleSignup);
