const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(
  process.env.ALWAYSDATA_HTTPD_PORT,
  "127.3.27.115",
  () => {
    console.log(`-- Express running → PORT ${server.address().port}`);
  }
);

// const server = app.listen(3000, () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });

const io = require("socket.io").listen(server);

return new Promise(resolve => {
  io.of("/PhoneToServer").on("connection", async function(socket) {
    console.log("connect");
    socket.on("clavierPhone", async function(data) {
      console.log("claverphone data : " + data);
      socket.broadcast.emit("dataFromPhone", data);
    });
  });
});
