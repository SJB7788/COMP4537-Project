import { Auth } from "./auth/authClass.js";

const auth = new Auth("https://52.70.76.55.nip.io");

const email = document.getElementById("email");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const password = document.getElementById("password");

const submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  const response = await auth.registerUser(
    firstName.value,
    lastName.value,
    email.value,
    password.value
  );

  if (response === true) {
    window.location.href = "/login";
  }
});
