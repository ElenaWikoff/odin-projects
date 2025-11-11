
const MenuItemCard = ({ name, desc, price, image }) => {
    const card = document.createElement("article");
    card.classList.add("menu-item-card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    // Header
    const cardHeader = document.createElement("h3");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = name;

    // Description
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = desc;
    const cardPrice = document.createElement("p");
    cardPrice.classList.add("card-price");
    cardPrice.textContent = `$${Number(price).toFixed(2)}`;
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);

    // Image
    const cardImageWrapper = document.createElement("div");
    cardImageWrapper.classList.add("card-image-wrapper");
    const cardImage = new Image();
    cardImage.alt = name;
    cardImage.src = image;
    cardImage.classList.add("card-image");
    cardImageWrapper.appendChild(cardImage);

    cardContent.appendChild(cardHeader);
    cardContent.appendChild(cardBody);
    card.appendChild(cardContent);
    card.appendChild(cardImageWrapper);

    return card;
}

export default MenuItemCard;