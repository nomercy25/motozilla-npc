 // в эту константу помещаем URL развёрнутого веб-приложения Google Apps Script
      // ВНИМАНИЕ! Это должен быть адрес ВАШЕГО РАЗВЕРНУТОГО ПРИЛОЖЕНИЯ
      // ТЕКУЩИЙ URL_APP приведён для примера
      const URL_APP =     "https://script.google.com/macros/s/AKfycbxkGoaMcFb0HNuRM0pLVnBu_o6ZbKQnV6-87u0FENBkkvwpPJm6O2FRKEMyUZZu1HOpnA/exec";

      // находим форму в документе
      const form = document.querySelector("#form");

      // указываем адрес отправки формы (нужно только в начале примера)
      form.action = URL_APP;

      // вспомогательная функция проверки заполненности формы
      function isFilled(details) {
        const { name, email, phone, rule } = details;
        if (!name) return false;
        if (!email) return false;
        if (!phone) return false;
        if (!rule) return false;
        return true;
      }

      // навешиваем обработчик на отправку формы
      form.addEventListener("submit", async (ev) => {
        // отменяем действие по умолчанию
        ev.preventDefault();

        // получаем ссылки на элементы формы
        const name = document.querySelector("[name=name]");
        const email = document.querySelector("[name=email]");
        const phone = document.querySelector("[name=phone]");
        const message = document.querySelector("[name=message]");
        const rule = document.querySelector("[name=rule]");
        const question = document.querySelector("[name=question]:checked");


        // собираем данные из элементов формы
        let details = {
          name: name.value.trim(),
          email: email.value.trim(),
          phone: phone.value.trim(),
          message: message.value.trim(),
          rule: rule.value,
          question: question.value,
        };
        console.log(details);

        // если поля не заполнены - прекращаем обработку
        if (!isFilled(details)) return;

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
          .catch((err) => alert("Помилка!"))
          // .then((res) => console.log(res));
          
         if( result.type === 'success' ) {
            name.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
            question.value = '';
           alert('Дякуємо, Вас буде перенаправлено до нашого сайту через 5 секунд')

    }
         if( result.type === 'error' ) {            
           alert(`Помилка( ${result.errors}`)
         }
  });

  function updatePhoneNumber(input) {
    // Если введенное значение не начинается с "+380", добавляем "+380" в начало
    if (!input.value.startsWith("+380")) {
      input.value = "+380" + input.value;
    }
  }



  


