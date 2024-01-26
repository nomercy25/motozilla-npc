// в эту константу помещаем URL развёрнутого веб-приложения Google Apps Script
// ВНИМАНИЕ! Это должен быть адрес ВАШЕГО РАЗВЕРНУТОГО ПРИЛОЖЕНИЯ
// ТЕКУЩИЙ URL_APP приведён для примера
const URL_APP = "https://script.google.com/macros/s/AKfycbyrjloEt7zjJVoR5EYXI1g6LfKUumhX4kSJu-xkBJdU5hoU5h2LvVBh4jJy2ItwZAGV_Q/exec";

// находим форму в документе
const form = document.querySelector("#form");

// указываем адрес отправки формы (нужно только в начале примера)
form.action = URL_APP;

// навешиваем обработчик на отправку формы
form.addEventListener("submit", async (ev) => {
  // отменяем действие по умолчанию
  ev.preventDefault();

  // получаем ссылки на элементы формы
  const message = document.querySelector("[name=message]");
  const question = document.querySelector("[name=question]:checked");

  // собираем данные из элементов формы
  let details = {
    message: message.value.trim(),
    question: question.value,
  };

  // подготавливаем данные для отправки
  let formBody = [];
  for (let property in details) {
    // кодируем названия и значения параметров
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  // склеиваем параметры в одну строку
  formBody = formBody.join("&");

  // выполняем отправку данных в Google Apps
  const result = await fetch(URL_APP, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    mode: "cors", //<- оставим по умолчанию
    body: formBody,
  })
    .then((res) => res.json())
    .catch((err) => alert("Помилка!"));
  // .then((res) => console.log(res));

  if (result.type === "success") {
    message.value = "";
    question.value = "";
    alert("Дякуємо за оцінку!");
  }
  if (result.type === "error") {
    alert(`Помилка( ${result.errors}`);
  }
});
