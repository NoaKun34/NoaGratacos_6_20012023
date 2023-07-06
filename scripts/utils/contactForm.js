import { photographerName } from "./../pages/photographer.js";

const buttonOpenModal = document.querySelector(".contact_button");
buttonOpenModal.addEventListener("click", displayModal);

const buttonCloseModal = document.getElementById("contactClose");
buttonCloseModal.addEventListener("click", closeModal);

export function displayModal() {
    const label = 'Contact me ' + photographerName;
    const modal = document.getElementById("contact_modal");
    const modalContent = document.querySelector(".modal");
    const contactName = document.getElementById("contactPhotographerName");
    modal.style.display = "block";
    contactName.textContent = photographerName;
    modalContent.setAttribute("aria-label", label);
    modalContent.focus();
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
});