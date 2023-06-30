function displayModal() {
    const modal = document.getElementById("contact_modal");
    const modalContent = document.querySelector(".modal");
    const contactName = document.getElementById("contactPhotographerName");
    modal.style.display = "block";
    contactName.textContent = photographerName;
    modalContent.focus();
}

function closeModal() {
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