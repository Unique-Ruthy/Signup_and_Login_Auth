const api_url = "http://localhost:7000";
const profileRoute = "/user";

const fullName = document.querySelector(".fullName"),
  email = document.querySelector(".email"),
  profileName = document.querySelector(".welcome"),
  logout = document.querySelector(".logout");

async function getProfile() {
  if (localStorage.getItem("token") == null) window.location = "login.html";
  try {
    // fetches the user's data from the server
    const res = await fetch(api_url + profileRoute, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const jsonData = await res.json();
    console.log(jsonData);
    fullName.textContent = jsonData.data.userName;

    email.textContent = jsonData.data.email;
    profileName.textContent = jsonData.data.userName;
  } catch (error) {
    console.error(error);
  }
}

getProfile();

function signoutHandler(e) {
  e.preventDefault();
  email.textContent = "";
  fullName.textContent = "";

  localStorage.removeItem("token");

  window.location = "login.html";
}

logout.addEventListener("click", signoutHandler);
