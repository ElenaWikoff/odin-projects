
const HoursCard = ({ hours }) => {
    const hoursCard = document.createElement("div");
    hoursCard.classList.add("hours-card");
    const ul = document.createElement("ul");

    hours.forEach(({ weekday, range }) => {
        const li = document.createElement("li");

        // Clock SVG
        const clock = document.createElementNS("http://www.w3.org/2000/svg","svg");
        clock.classList.add("clock");
        clock.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        clock.setAttribute("viewBox", "0 0 24 24");
        const path = document.createElementNS("http://www.w3.org/2000/svg","path");
        path.setAttribute("d", "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z");
        path.setAttribute("fill", "currentColor");
        path.setAttribute("width", "1em");
        path.setAttribute("height", "1em");
        clock.appendChild(path);

        // Weekday
        const weekdayElement = document.createElement("span");
        weekdayElement.classList.add("weekday");
        weekdayElement.textContent = weekday;

        // Dots
        const dots = document.createElement("span");
        dots.classList.add("dots");

        // Hours
        const hoursElement = document.createElement("span");
        hoursElement.classList.add("hours");
        hoursElement.textContent = range ? `${range.start}-${range.end}` : "CLOSED";

        li.appendChild(clock);
        li.appendChild(weekdayElement);
        li.appendChild(dots);
        li.appendChild(hoursElement);

        ul.appendChild(li);
    });

    hoursCard.appendChild(ul);

    return hoursCard;
}

export default HoursCard;