function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // empêche l'envoi du formulaire
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // affiche les valeurs saisies dans la console
});