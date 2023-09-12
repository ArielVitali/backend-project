const socket = io();

const liveProducts = document.getElementById("liveProducts");
const addProductBtn = document.getElementById("addProductBtn");
const deleteBtn = document.getElementById("deleteBtn");

const messageFromServer = document.getElementById("messageFromServer");
const chatBox = document.getElementById("chatBox");
const messages = document.getElementById("messages");

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Retrieve form field values
  const pid = document.getElementById("productId").value;

  fetch(`/api/products/${pid}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product deleted successfully:", data);
      document.getElementById("productId").value = "";
    })
    .catch((error) => {
      console.error("Error deleting product:", error);
    });
});

addProductBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;

  const productData = {
    title,
    price,
  };

  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product added successfully:", data);
      document.getElementById("title").value = "";
      document.getElementById("price").value = "";
    })
    .catch((error) => {
      console.error("Error adding product:", error);
    });
});

socket.on("listOfproducts", (data) => {
  // Initial table setup with header row
  liveProducts.innerHTML = `
    <table style="margin: 20px; padding:20px;">
      <thead>
        <tr>
          <td>Nombre</td>
          <td>Precio</td>
          <td>id</td>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (product) => `
            <tr>
              <td>
                <h2>${product.title}</h2>
              </td>
              <td>
                <p>${product.price}</p>
              </td>
              <td>
                <p>${product._id}</p>
              </td>
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>
  `;
});

socket.on("error", (error) => {
  console.error(error);
});

const startChat = async () => {
  const result = await Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario para identificarte en el chat",
    inputValidator: (value) => {
      return !value && "Necesitas escribir un usuario";
    },
  });

  const user = result.value;
  socket.emit("newUser", user);

  socket.on("newUserConnected", (user) => {
    Swal.fire({
      text: `${user} acaba de conectarse`,
      toast: true,
      position: "top-right",
    });
  });

  socket.on("allChats", (data) => {
    if (data.length > 0 && user) {
      console.log(user);
      data.forEach(
        (message) =>
          (messages.innerHTML += ` ${message.user} : ${message.message}<br>`)
      );
    }
  });

  chatBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const userMessage = {
        user,
        message: chatBox.value,
      };
      socket.emit("chatFromClient", userMessage);
      chatBox.value = "";
    }
  });

  socket.on("messageForChat", (data) => {
    const actualLocalTime = new Date().toLocaleString();
    const coloredDate = `<span style="color: green;">[${actualLocalTime}]</span>`;

    const templateString = `${coloredDate} ${data.user} : ${data.message}<br>`;

    messages.innerHTML += templateString;
  });
};
startChat();
