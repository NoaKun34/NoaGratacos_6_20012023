const url = new URL(location.href);
const getParams = url.searchParams.get("id");
const photographerID = parseInt(getParams);

let mediaTable = [];

const popularity = document.getElementById("popularity");
const date = document.getElementById("date");
const alpha = document.getElementById("alpha");

const dataContainer = document.querySelector(".dataContainer");

const select = document.querySelector(".selectSort");

select.addEventListener("change", (event) => {
    dataContainer.innerHTML = "";
    const sortType = event.target.value;
    let parsedSortType = parseInt(sortType);
    displayMedia(mediaTable, parsedSortType);
});

//popularity.addEventListener("click", changeSort(1));
//date.addEventListener("click", changeSort(2));
//alpha.addEventListener("click", changeSort(3));


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

async function displayMedia(data, sortType) {
    const sorted = mediaSort(data, sortType);

    totalLikes(data);

    sorted.forEach((media) => {
        selectFactory(media);
    });
    return sorted;
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
    const photographersInfoSection = document.querySelector(".photographerInfo");
    const photographerSelfi = document.getElementById("photographerSelfi");
    const picture = `assets/photos/photographers_selfi/${portrait}`;

    const tjm = `${price}€/jour`;
    const tjmElement = document.querySelector(".tjm");
    tjmElement.textContent = tjm;

    const h1 = document.createElement("h1");
    h1.setAttribute("class", "photographerName");
    h1.textContent = name;
    const locationElement = document.createElement("p");
    locationElement.setAttribute("class", "photographerLocation");
    locationElement.textContent = location;
    const taglineElement = document.createElement("p");
    taglineElement.setAttribute("class", "photographerTagline");
    taglineElement.textContent = tagline;
    photographerSelfi.setAttribute("src", picture);

    photographersInfoSection.appendChild(h1);
    photographersInfoSection.appendChild(locationElement);
    photographersInfoSection.appendChild(taglineElement);

    return photographerData;
}

async function initPhotographer() {
    const photographerData = await getPhotographersData();
    displayPhotographerData(photographerData.photographers, photographerID);
    const sortType = 1;
    let medias = searchMedia(photographerData.media, photographerID);
    mediaTable = medias;
    displayMedia(medias, sortType);
    test();
}

initPhotographer();