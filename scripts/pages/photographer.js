import { selectFactory } from "./../factories/media.js";
import { openLightbox } from "./../utils/lightbox.js";

const url = new URL(location.href);
const getParams = url.searchParams.get("id");
export const photographerID = parseInt(getParams);
export let photographerName = null;

export let mediaTable = [];

export const popularity = document.getElementById("popularity");
export const date = document.getElementById("date");
export const alpha = document.getElementById("alpha");

const dataContainer = document.querySelector(".dataContainer");

export const mediaEnterClick = document.querySelector(".mediaEnter");

const select = document.querySelector(".selectSort");

select.addEventListener("change", (event) => {
    dataContainer.innerHTML = "";
    const sortType = event.target.value;
    let parsedSortType = parseInt(sortType);
    displayMedia(mediaTable, parsedSortType);
});

export function keyboardClick(event, elementType, id) {
    if (event.key === 'Enter') {
        if (elementType === 2 || elementType === 1) {
            openLightbox(id);
        }
        if (elementType === 3) {
            mediasLikes(id);
        }
    }
}

async function getPhotographersData() {
    const dataPath = '../../data/photographers.json';

    try {
        const response = await fetch(dataPath);
        const data = await response.json();

        return data;
    } catch (err) {
        console.log("Erreur")
    }
}

function totalLikes(data) {
    let totalLikes = 0;
    const likesP = document.querySelector(".likesTotal");

    data.forEach((item) => {
        totalLikes += item.likes;
    });
    likesP.textContent = totalLikes;

    return totalLikes;
}

function displayMedia(data, sortType) {
    const sorted = mediaSort(data, sortType);

    totalLikes(data);

    sorted.forEach((media) => {
        selectFactory(media);
    });
    return;
}

function searchMedia(data, photographerId) {
    const medias = [];

    data.forEach((item) => {
        if (item.photographerId === photographerId) {
            medias.push(item);
        }
    });

    return medias;
}

function sortByTitle(data) {
    const sorted = [...data].sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
    return sorted;
}

function mediaSort(data, type) {
    if (type === 1) {
        data.sort((a, b) => b.likes - a.likes);
        return data;
    } else if (type === 2) {
        data.forEach((item) => {
            item.date = new Date(item.date);
        });
        data.sort((a, b) => a.date - b.date);
        return data;
    } else if (type === 3) {
        const temp = sortByTitle(data);
        return temp;
    }
}

function displayPhotographerData(data, id) {
    const photographerData = data.find((item) => item.id === id);
    const { name, city, country, tagline, portrait, price } = photographerData;
    const location = `${city}, ${country}`;
    photographerName = name;
    const photographersInfoSection = document.querySelector(".photographerInfo");
    const photographerSelfi = document.getElementById("photographerSelfi");
    const picture = `assets/photos/photographers_selfi/${portrait}`;

    const tjm = `${price}€/jour`;
    const tjmElement = document.querySelector(".tjm");
    tjmElement.textContent = tjm;

    const h1 = document.createElement("h1");
    h1.setAttribute("class", "photographerName");
    h1.textContent = name;
    h1.setAttribute("tabindex", "2");
    const infoElement = document.createElement("div");
    infoElement.setAttribute("class", "infoElement");
    infoElement.setAttribute("tabindex", "3");
    const locationElement = document.createElement("p");
    locationElement.setAttribute("class", "photographerLocation");
    locationElement.textContent = location;
    const taglineElement = document.createElement("p");
    taglineElement.setAttribute("class", "photographerTagline");
    taglineElement.textContent = tagline;
    photographerSelfi.setAttribute("src", picture);
    photographerSelfi.setAttribute("aria-label", name);

    photographersInfoSection.appendChild(h1);
    photographersInfoSection.appendChild(infoElement);
    infoElement.appendChild(locationElement);
    infoElement.appendChild(taglineElement);

    return photographerData;
}

export function mediasLikes(mediaId) {
    const elementId = `likes-${mediaId}`;
    const mediaLikeCounter = document.getElementById(elementId);
    const totalLikeCounter = document.querySelector(".likesTotal");

    let mediaCount = parseInt(mediaLikeCounter.innerText);
    let totalCount = parseInt(totalLikeCounter.innerText);

    const liked = mediaLikeCounter.classList.contains("liked");
    if (liked) {
        mediaLikeCounter.classList.remove("liked");
        mediaCount--;
        totalCount--;
        mediaLikeCounter.textContent = mediaCount;
        totalLikeCounter.textContent = totalCount;
    } else {
        mediaLikeCounter.classList.add("liked");
        mediaCount++;
        totalCount++;
        mediaLikeCounter.textContent = mediaCount;
        totalLikeCounter.textContent = totalCount;
    }
}

async function initPhotographer() {
    const photographerData = await getPhotographersData();
    displayPhotographerData(photographerData.photographers, photographerID);
    const sortType = 1;
    let medias = searchMedia(photographerData.media, photographerID);
    mediaTable = medias;
    displayMedia(medias, sortType);
}

initPhotographer();