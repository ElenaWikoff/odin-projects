// button.js

const Button = ({ variant, label, onClick }) => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add(`btn-${variant}`);
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
}

export default Button;