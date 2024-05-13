import createCustomer from "src/api/api";
import { createSnackbar } from "src/components/elements";

export function formRegistrationHandler() {
    const form = <HTMLFormElement>document.querySelector(".registration-form");
    form.onsubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const email = <string>formData.get("email");
      const password = <string>formData.get("password");
      const name = <string>formData.get("name");
      const surname = <string>formData.get("surname");
      const birthday = <string>formData.get("birthday");
      const city = <string>formData.get("city");
      const streetName = <string>formData.get("street");
      const postalCode = <string>formData.get("index");
      const countries = <HTMLSelectElement>document.querySelector(".countries");
      const country = countries.value;
  
      const requestBody = {
        email: email.trim(),
        password: password.trim(),
        firstName: name.trim(),
        lastName: surname.trim(),
        dateOfBirth: birthday,
        addresses: [{ country, city, streetName, postalCode }],
      };
  
      createCustomer(requestBody)
        .then(({ body }) => {
          createSnackbar(`Пользователь ${body.customer.firstName} создан`);
           // userAuthorization(login, password);
          window.location.href = '#main'
        })
        .catch(({statusCode}) =>  {
          if (statusCode === 400){
            createSnackbar(`Пользователь c таким адресом электронной почты уже существует. Войдите в приложение`);
          } 
          if (statusCode === 500){
            createSnackbar(`Что-то пошло не так... Попробуйте зарегистрироваться позже`);
          } 
        })
          
      }
    }
export default formRegistrationHandler;
