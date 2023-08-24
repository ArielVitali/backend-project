const form = document.getElementById("formSignup");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);

  fetch("/api/users", {
    "Content-Type": "application/json",
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
