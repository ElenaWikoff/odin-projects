// header.js
import Button from "./button.js";
import { navigate } from "../utils/router.js"

const Header = ({ routes }) => {

    const handleNavigation = (route) => {
        const navList = document.querySelectorAll(".nav-item");
        navList.forEach((item) => {
            if (item.getAttribute("id") === route.title) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
        navigate(route.page());
    }

    const header = document.createElement("header");

    // Logo
    const logo = document.createElement("img");
    logo.classList.add("header-logo");
    logo.setAttribute("src", "/src/assets/logos/wannabee-yours-logo.svg");
    logo.setAttribute("alt", "Wannabee Yours Logo");

    // Nav Menu
    const nav = document.createElement("nav");
    nav.classList.add("nav");
    const navMenu = document.createElement("ul");
    navMenu.classList.add("nav-menu");
    routes.forEach((route) => {
        const navItem = document.createElement("li");
        navItem.classList.add("nav-item");
        navItem.setAttribute("id", route.title);
        if (route.title === "Home") {
            navItem.classList.add("active");
        }
        const button = Button({
            variant: "menu",
            label: route.title,
            onClick: () => handleNavigation(route),
        });
        navItem.appendChild(button);
        navMenu.appendChild(navItem);
    });
    nav.appendChild(navMenu);


    // Add elements to header element
    header.appendChild(logo);
    header.appendChild(nav);

    return header;
}

export default Header;