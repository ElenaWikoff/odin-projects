const about = () => {
    const section = document.createElement("section");
    section.classList.add("container");

    // Header
    const heading = document.createElement("h2");
    heading.textContent = "About"

    // Description
    const desc = document.createElement("p");
    desc.textContent = "At WANNABEE YOURS, we believe that food should be as sweet, nourishing, and natural as the bees that inspire us. Our restaurant is built on a love for honey in all its golden forms — from the floral notes of wildflower honey to the deep richness of buckwheat honey.";

    // Map
    const mapHeader = document.createElement("h3");
    mapHeader.textContent = "Location"
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.5492893538446!2d-73.98601735432555!3d40.75768820051486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1756496828547!5m2!1sen!2sus";
    iframe.width = "100%";
    iframe.height = "450";
    iframe.setAttribute("style", "border: 5px solid var(--yellow); border-radius: 20px;");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("scrolling", "no");

    section.appendChild(heading);
    section.appendChild(desc);
    section.appendChild(mapHeader)
    section.appendChild(iframe);

    return section;
}

export default about;