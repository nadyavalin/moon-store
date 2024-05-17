import { Pages } from "src/types/types";
import { menuItemLogIn, menuItemLogOut, menuItemSingUp, userMenu } from "../basePage/basePage";

function logout() {
  userMenu.append(menuItemLogOut);
  menuItemLogIn.href = Pages.MAIN;
  menuItemSingUp.href = Pages.MAIN;
  menuItemLogOut.addEventListener("click", () => {
    localStorage.removeItem("refreshToken");
    menuItemLogIn.href = Pages.LOGIN;
    menuItemSingUp.href = Pages.REGISTRATION;
    menuItemLogOut.remove();
  });
}

export default logout;
