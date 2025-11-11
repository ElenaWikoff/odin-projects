
export const navigate = (page) => {
    const container = document.getElementById("content");
    const prevPage = container.firstChild;
    if (!prevPage) {
        container.appendChild(page);
    } else {
        container.replaceChild(page, container.firstChild);
    }
}