export function formRegistrationHandler() {
    
    const form = <HTMLFormElement>document.querySelector('.registration-form');
    form.onsubmit = (event) => {
      event.preventDefault();
    //   const formData = new FormData(form);
    //   const login = <string>formData.get('login');
    //   const password = <string>formData.get('password');
    //   sessionStorage.setItem('login-fun-chat', login);
    //   sessionStorage.setItem('password', password);
    //   userAuthorization(login, password);
    console.log('handler')
    };




}
export default formRegistrationHandler;