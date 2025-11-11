import MenuItemCard from "../components/menuItem.js";

const menuItems = [
    {
        name: "Golden Nectar Lemonade",
        desc: "Fresh lemonade infused with lavender honey.",
        price: 4,
        image: "/src/assets/images/tea-and-honey.jpg",
    },
    {
        name: "Honey Drop Latte",
        desc: "Espresso, steamed milk, and honey-cinnamon syrup.",
        price: 5,
        image: "/src/assets/images/honey-latte.jpg",
    },
    {
        name: "Bee's Knees Bread Basket",
        desc: "Warm honey-wheat biscuits served with whipped honey butter and a drizzle of wildflower honey.",
        price: 6,
        image: "/src/assets/images/honey-butter-biscuits.jpg",
    },
    {
        name: "Honey Butter Chicken Beescuit",
        desc: "Buttermilk-fried chicken tucked inside a fluffy honey biscuit, brushed with warm honey butter.",
        price: 14,
        image: "/src/assets/images/honey-butter-chicken-biscuit.jpg",
    },
    {
        name: "Sweet Sting Wings",
        desc: "Crispy chicken wings glazed with spicy honey-chili sauce, garnished with sesame seeds.",
        price: 12,
        image: "/src/assets/images/hot-honey-chicken-wings.jpg",
    },
    {
        name: "Sweet Heat Salmon",
        desc: "Grilled salmon bites with a honey-lime glaze, served with wild rice and roasted asparagus.",
        price: 20,
        image: "/src/assets/images/honey-salmon.jpg",
    },
]

const menu = () => {
    const section = document.createElement("section");
    section.classList.add("container");

    // Header
    const heading = document.createElement("h2");
    heading.textContent = "Menu"

    // Menu
    const cardGrid = document.createElement("div");
    cardGrid.classList.add("menu-grid");
    menuItems.forEach((item) => {
        const menuItem = MenuItemCard({ ...item });
        cardGrid.appendChild(menuItem);
    });

    section.appendChild(heading);
    section.appendChild(cardGrid);

    return section;
}

export default menu;