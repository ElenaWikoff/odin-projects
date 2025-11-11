import ReviewCard from "../components/review.js";
import HoursCard from "../components/hours.js";

const reviews = [
    {
        quote: "Sweetest dining experience ever!",
        stars: 5,
        name: "Jerry Stinger"
    },
    {
        quote: "A refreshing surprise—I'll bee back!",
        stars: 4,
        name: "B.J. Novak"
    },
    {
        quote: "Their honey-butter biscuits were un-bee-lievable!",
        stars: 5,
        name: "Jana Beesley"
    },
    {
        quote: "Amazing! But strange that all the employees wore trenchcoats and never spoke outside of buzzing noises.",
        stars: 3,
        name: "Thomas Combs"
    },
]

const hours = [
    {
        weekday: "Monday",
        range: null
    },
    {
        weekday: "Tuesday",
        range: {
            start: "9AM",
            end: "2PM"
        }
    },
    {
        weekday: "Wednesday",
        range: {
            start: "9AM",
            end: "2PM"
        }
    },
    {
        weekday: "Thursday",
        range: {
            start: "9AM",
            end: "2PM"
        }
    },
    {
        weekday: "Friday",
        range: {
            start: "9AM",
            end: "2PM"
        }
    },
    {
        weekday: "Saturday",
        range: {
            start: "9AM",
            end: "5PM"
        }
    },
    {
        weekday: "Sunday",
        range: {
            start: "9AM",
            end: "5PM"
        }
    },
]

const home = () => {
    const section = document.createElement("section");
    section.classList.add("container");

    // Header
    const heading = document.createElement("h2");
    heading.textContent = "Where Every Bite is Golden."
    heading.setAttribute("style", "font-style: italic");

    // Reviews
    const cardGrid = document.createElement("div");
    cardGrid.classList.add("card-grid");
    reviews.forEach(({ quote, stars, name }) => {
        const reviewCard = ReviewCard({ quote, stars, name });
        cardGrid.appendChild(reviewCard);
    });

    // Hours
    const hoursCard = HoursCard({ hours });

    // Append Children to section
    section.appendChild(heading);
    section.appendChild(cardGrid);
    section.appendChild(hoursCard);

    return section;
}

export default home;