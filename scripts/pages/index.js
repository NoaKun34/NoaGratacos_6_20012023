import { photographerFactory } from "./../factories/photographerFactory";

async function getPhotographers() {
    const dataPath = '../../data/photographers.json';

    try {
        const response = await fetch(dataPath);
        const data = await response.json();

        return data;
    } catch (err) {
        console.log("Erreur")
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

