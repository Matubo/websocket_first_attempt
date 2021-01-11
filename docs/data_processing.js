function connect() {
  let socket = new WebSocket("ws://localhost:3000");  //адрес для подключения

  socket.onopen = function () {                       //открываем соединение и отправляем данные на сервер
    let data = getData();
    addDom("Соединение установлено");
    socket.send(data);
  };

  socket.onmessage = function (event) {               //реагируем на сообщения от сервера
    addDom(`Данные полученные с сервера: ${event.data}`);
  };

  socket.onclose = function (event) {                 //проверяем код ошибки, активируем кнопку
    if (event.wasClean) {
      addDom(`Соединение закрыто, код=${event.code} данные=${event.reason}`);
      buttonState();
    } else {
      // например, сервер убил процесс или сеть недоступна
      addDom("Соединение прервано");
      buttonState();
    }
  };

  socket.onerror = function (error) {                 //реагируем на ошибки
    addDom(`У нас ошибка ${error.message}`);
  };
}

function getData() {                                  //считываем данные из textbox, очищаем окно результатов, дизайбилим кнопку
  let textarea = document.getElementById("textarea").value;
  clearData();
  buttonState("disable");
  return textarea;
}
function buttonState(state) {                         //изменяем состояние кнопки disabled/enabled 
  let button = document.getElementById("button");
  if (state == "disable") {
    button.setAttribute("disabled", "true");
  } else {
    button.removeAttribute("disabled");
  }
}
function clearData() {                                //удаляем все данные из окна результатов
  let result = document.getElementById("result");
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function addDom(message) {                            //добавляем данные в окно результатов
  let result = document.getElementById("result");
  let div_elem = document.createElement("div");
  let date = new Date();
  div_elem.innerHTML = `Время:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${message}`;
  result.append(div_elem);
}
