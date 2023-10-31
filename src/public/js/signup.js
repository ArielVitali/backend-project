const form = document.getElementById("formSignup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);

  const url = "/api/users";
  const headers = {
    "Content-Type": "application/json",
  };
  const method = "POST";
  const body = JSON.stringify(obj);

  fetch(url, {
    headers,
    method,
    body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Signup successfully") {
        // Reload the page upon successful login
        location.reload();
      } else {
        // Handle login failure here
        console.log("Signup failed");
      }
      console.log(data);
    })
    .catch((err) => console.log(err));
});
