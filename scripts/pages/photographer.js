const url = new URL(location.href);
const getParams = url.searchParams.get("id");
const photographerID = parseInt(getParams);

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


async function displayMedia(data, photographerId) {
    const medias = [];
    //const dataContainer = document.querySelector(".dataContainer");
  
    data.forEach((item) => {
      if (item.photographerId === photographerId) {
        medias.push(item);
        console.log(item.likes);
      }
    });

    medias.forEach((media) => {
        //const mediaCard = selectFactory(media);
        //dataContainer.appendChild(mediaCard);
        selectFactory(media);
    });
    console.log(medias);
    return medias;
}

async function displayPhotographerData(data, id) {
    const photographerData = data.find((item) => item.id === id);
    const { name, city, country, tagline, portrait } = photographerData;
    const location = `${city}, ${country}`;
    const photographersInfoSection = document.querySelector(".photographerInfo");
    const photographerSelfi = document.getElementById("photographerSelfi");
    const picture = `assets/photos/photographers_selfi/${portrait}`;

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

//async function displayData(photographerData) {}

async function initPhotographer() {
    console.log("Test starting photographer");
    const photographerData = await getPhotographersData();
    await displayPhotographerData(photographerData.photographers, photographerID);
    await displayMedia(photographerData.media, photographerID);
}

initPhotographer();