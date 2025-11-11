
const attributions = [
    {
        object: "Icons",
        author: "Material Design Icons",
        from: "Pictogrammers",
        url: "https://pictogrammers.com/library/mdi/"
    },
    {
        object: "Logo",
        author: "Macrovector",
        from: "Freepik",
        url: "https://www.freepik.com/"
    },
    {
        object: "Background Image",
        author: "Starline",
        from: "Freepik",
        url: "https://www.freepik.com/"
    },
]

const Footer = () => {
    const footer = document.createElement("footer");
    footer.classList.add(".footer");

    

    attributions.forEach((item) => {
        const div = document.createElement("div");
        const attribution = document.createElement("p");
        attribution.textContent = `${item.object} from ${item.author}-`;

        const cite = document.createElement("cite");
        const link = document.createElement("a");
        link.setAttribute("href", item.url);
        link.textContent = item.from;
        cite.appendChild(link);

        div.appendChild(attribution);
        div.appendChild(cite);

        footer.appendChild(div);
    });

    return footer;
}

export default Footer;