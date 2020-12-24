function connect() {
  let socket = new WebSocket("ws://localhost:8080");

  socket.onopen = function () {
    let data = getData();
    addDom("Соединение установлено");
    socket.send(data);
  };

  socket.onmessage = function (event) {
    addDom(`Данные полученные с сервера: ${event.data}`);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      addDom(`Соединение закрыто, код=${event.code} данные=${event.reason}`);
      buttonState();
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      addDom("Соединение прервано");
    }
  };

  socket.onerror = function (error) {
    addDom(`У нас ошибка ${error.message}`);
  };
}

function getData() {
  let textarea = document.getElementById("textarea").value;
  clearData();
  buttonState("disable");
  return textarea;
}
function buttonState(state) {
  let button = document.getElementById("button");
  if (state == "disable") {
    button.setAttribute("disabled", "true");
  } else {
    button.removeAttribute("disabled");
  }
}
function clearData() {
  let result = document.getElementById("result");
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function addDom(message) {
  let result = document.getElementById("result");
  let div_elem = document.createElement("div");
  let date = new Date();
  div_elem.innerHTML = `Время:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${message}`;
  result.append(div_elem);
}
