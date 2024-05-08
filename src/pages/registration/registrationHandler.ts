export function formRegistrationHandler() {
  const form = <HTMLFormElement>document.querySelector(".registration-form");
  form.onsubmit = (event) => {
    event.preventDefault();
    //   const formData = new FormData(form);
    //   const login = <string>formData.get('login');
    //   userAuthorization(login, password);
  };
}
export default formRegistrationHandler;
