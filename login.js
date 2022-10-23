const api_url = "http://localhost:7000";

const signupRoute = "/auth/signup";
const signinRoute = "/auth/login";

console.log(api_url + signinRoute);
const signinBtn = document.querySelector(".btn");
const signinForm = document.querySelector(".signinForm");

const message = document.getElementById("msg");

const login = async (e) => {
  e.preventDefault();

  message.innerText = "Signing in...";
  message.className = "submit";

  const userInfo = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  console.log(userInfo);
  try {
    const res = await fetch(api_url + signinRoute, {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "content-type": "application/json",
      },
    });
    const jsonResponse = await res.json();

    message.innerText = jsonResponse.message;
    message.className = jsonResponse.status;

    console.log(jsonResponse);

    if (jsonResponse.status === "success") {
      localStorage.setItem("token", jsonResponse.token);
      console.log(jsonResponse.token);

      setTimeout(() => {
        window.location.pathname = "/profile1.html";
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
};

signinForm.addEventListener("submit", login);
