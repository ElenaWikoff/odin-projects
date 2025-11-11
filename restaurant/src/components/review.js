
const ReviewCard = ({ quote, stars, name }) => {
    const card = document.createElement("blockquote");
    card.classList.add("review-card");

    // Quote
    const content = document.createElement("p");
    content.textContent = quote;

    // Stars
    const rating = document.createElement("div");
    rating.classList.add("rating");
    for (let i = 0; i < 5; i++) {
        const star = document.createElementNS("http://www.w3.org/2000/svg","svg");
        star.classList.add("star");
        star.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        star.setAttribute("viewBox", "0 0 24 24");
        if (i < stars) {
            star.classList.add("filled");
        }

        // Path
        const path = document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("d", "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z");
        path.setAttribute("fill", "currentColor");
        path.setAttribute("width", "20px");
        path.setAttribute("height", "20px");

        star.appendChild(path);
        rating.appendChild(star);
    }

    // Name
    const nameElement = document.createElement("cite");
    nameElement.classList.add("cite");
    nameElement.textContent = "— " + name;

    // Add Elements
    card.appendChild(content);
    card.appendChild(rating);
    card.appendChild(nameElement);

    return card;
}

export default ReviewCard;