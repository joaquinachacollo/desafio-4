const socket = io();

/*input.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    socket.emit("message2", input.value);
    input.value = "";
  }
});

socket.on("log", (data) => {
  let logs = "";

  data.logs.forEach((log) => {
    logs += `${log.socketid} dice: ${log.message} <br/>`;
  });
  log.innerHTML = logs;
});*/

/*input.addEventListener("keyup", (evt) => {
  let { key } = evt;
  evt.target.value = "";
  socket.emit("message1", key);
});

socket.on("log", (data) => {
  log.innerHTML += data;
});*/
