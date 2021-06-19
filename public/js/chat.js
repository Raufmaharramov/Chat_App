const socket = io();

socket.on("message", message => {
  console.log(message);
});

document.querySelector("#submit").addEventListener("submit", e => {
  e.preventDefault();

  let msg = e.target.elements.message.value;

  socket.emit("sendMessage", msg);
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Your browser does not support geolocation!");
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", { lat: position.coords.latitude, long: position.coords.longitude });
  });
});
