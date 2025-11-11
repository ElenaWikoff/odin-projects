// index.js

// Pages
import home from "./pages/home.js";
import menu from "./pages/menu.js";
import about from "./pages/about.js";

// Components
import Header from "./components/header.js";
import Footer from "./components/footer.js";

const routes = [
    {
        title: "Home",
        path: "",
        page: home,
    },
    {
        title: "Menu",
        path: "/menu",
        page: menu,
    },
    {
        title: "About",
        path: "/about",
        page: about,
    },
];

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM Content Loaded");

    // Add Header
    const app = document.getElementById("app");
    const header = Header({
        routes,
    });
    app.appendChild(header);

    // Add Content Container
    const container = document.createElement("main");
    container.setAttribute("id", "content");
    container.appendChild(routes[0].page());
    app.appendChild(container);

    // Add Footer
    const footer = Footer();
    app.appendChild(footer);
});