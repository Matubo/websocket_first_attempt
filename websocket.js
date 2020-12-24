const { request } = require("express");
const http = require("http");
const WebSocket = require("ws");

let server = http.createServer();

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    let i = 0;

    let interval = setInterval(() => {
      if (i < 10) {
        ws.send("'" + message + "'- Сообщение номер: -" + i);
        i++;
      } else {
        ws.close(1000, "Подключение закрыто");
        clearInterval(interval);
      }
    }, 1000);
  });
});

server.listen(8080);
