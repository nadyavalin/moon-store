import { Pages } from "src/types/types";
import { header, menuItemLogIn, menuItemLogOut, menuItemSingUp } from "../basePage/basePage";

function changeAppAfterLogout() {
  const greeting = header.querySelector(".user-greeting");
  localStorage.removeItem("user");
  localStorage.removeItem("refreshToken");
  window.location.hash = Pages.LOGIN;
  menuItemLogIn.href = Pages.LOGIN;
  menuItemSingUp.href = Pages.REGISTRATION;
  greeting?.remove();
  menuItemLogOut.remove();
}

menuItemLogOut.addEventListener("click", changeAppAfterLogout);

export default changeAppAfterLogout;
