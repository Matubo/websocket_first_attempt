const express = require("express");
const path = require("path");
const app = express();
const WebSocket = require("express-ws")(app);

const port = 3000;

const clientPath = path.join(__dirname, "docs"); //корневая папка
app.use(express.static(clientPath));
app.get("/", (req, res) => {
  res.send(clientPath);
});

app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log("received: %s", msg);

    let i = 0;

    let interval = setInterval(() => {
      if (i < 10) {
        ws.send("'" + msg + "'- Сообщение номер: -" + i);
        i++;
      } else {
        ws.close(1000, "Подключение закрыто");
        clearInterval(interval);
      }
    }, 1000);
  });
});

app.listen(port, () => {
  console.log(`work on ${port}`);
});
