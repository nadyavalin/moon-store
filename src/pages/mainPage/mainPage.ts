import { createDiv, createElement, createMenuItem } from "../../components/elements";

export const header = createDiv(["header"]);
const h1 = createElement("h1", ["h1"], "Welcome to our Online Moon Store");
const userMenu = createDiv(["user-menu"]);
const menu = createDiv(["menu"]);

const menuItemSingUp = createMenuItem("#", "Sing up");
const menuItemLogIn = createMenuItem("#", "Log in");

// const menuItemUserProfile = createMenuItem("#", "Profile");
// const menuItemLogOut = createMenuItem("#", "Log out");

const menuItemHome = createMenuItem("#", "Home");
const menuItemCatalog = createMenuItem("#", "Catalog");
const menuItemBasket = createMenuItem("#", "Basket");
const menuItemAboutUs = createMenuItem("#", "About Us");

userMenu.append(menuItemSingUp, menuItemLogIn);
menu.append(menuItemHome, menuItemCatalog, menuItemBasket, menuItemAboutUs);
header.append(userMenu, h1, menu);

export default header;
