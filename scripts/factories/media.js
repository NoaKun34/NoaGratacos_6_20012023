import { openLightbox } from "./../utils/lightbox.js";

export function selectFactory(data) {
    const { image, video } = data;
    const dataContainer = document.querySelector(".dataContainer");

    if (image === undefined) {
        const videoModel = videoFactory(data);
        const videoDOM = videoModel.getMediaCardDOM();
        dataContainer.appendChild(videoDOM);
    } else if (video === undefined) {
        const imageModel = imageFactory(data);
        const imageDOM = imageModel.getMediaCardDOM();
        dataContainer.appendChild(imageDOM);
    }

    return 0;
}

function imageFactory(data) {
    const { id, photographerId, title, image, likes, date, price } = data;

    const imagePath = `assets/photos/${photographerId}/${image}`;
    const aria = `${title}, closeup view`;

    const checker = 1;
    const checkerHearth = 3;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("class", "media");

        const img = document.createElement('img');
        img.setAttribute("src", imagePath);
        img.setAttribute("alt", title);
        img.setAttribute("id", id);
        img.setAttribute("class", "mediaEnter");
        img.setAttribute("tabindex", "0");
        img.setAttribute("aria-label", aria);
        //img.setAttribute('onclick', `openLightbox(${id})`);
        img.setAttribute('onkeydown', `keyboardClick(event, ${checker}, ${id})`);
        img.addEventListener('click', () => openLightbox(id));

        const descContainer = document.createElement('div');
        descContainer.setAttribute("class", "desc");

        const infoElement = document.createElement('div');
        infoElement.setAttribute("class", "mediaInfo");

        const titleElement = document.createElement('h2');
        titleElement.setAttribute("class", "mediaTitle");
        titleElement.setAttribute("tabindex", "0");
        titleElement.textContent = title;

        const likesContainer = document.createElement('div');
        likesContainer.setAttribute("class", "likesContainer");

        const likesElement = document.createElement('p');
        likesElement.setAttribute("class", "mediaLikes");
        likesElement.setAttribute("id", `likes-${id}`);
        likesElement.textContent = likes;

        const heartElement = document.createElement('img');
        heartElement.setAttribute("src", "assets/icons/heart.svg");
        heartElement.setAttribute("class", "heart");
        heartElement.setAttribute("aria-label", "likes");
        heartElement.setAttribute("alt", "likes");
        heartElement.setAttribute("tabindex", "0");
        heartElement.setAttribute('onclick', `mediasLikes(${id})`);
        heartElement.setAttribute('onkeydown', `keyboardClick(event, ${checkerHearth}, ${id})`);

        infoElement.appendChild(titleElement);
        infoElement.appendChild(likesContainer);
        likesContainer.appendChild(likesElement);
        likesContainer.appendChild(heartElement);

        article.appendChild(img);
        article.appendChild(infoElement);

        return (article);
    }

    return { id, photographerId, title, imagePath, likes, date, price, getMediaCardDOM };
}

function videoFactory(data) {
    const { id, photographerId, title, video, likes, date, price } = data;

    const videoPath = `assets/photos/${photographerId}/${video}`;
    const aria = `${title}, closeup view`;

    const checker = 2;
    const checkerHearth = 3;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("class", "media");

        const video = document.createElement('video');
        video.setAttribute("src", videoPath);
        video.setAttribute("alt", title);
        video.setAttribute("type", "video/mp4");
        video.setAttribute("id", id);
        video.setAttribute("class", "mediaEnter");
        video.setAttribute("tabindex", "0");
        video.setAttribute('onclick', `openLightbox(${id})`);
        video.setAttribute("aria-label", aria);
        video.setAttribute('onkeydown', `keyboardClick(event, ${checker}, ${id})`);

        const descContainer = document.createElement('div');
        descContainer.setAttribute("class", "desc");

        const likesContainer = document.createElement('div');
        likesContainer.setAttribute("class", "likesContainer");

        const likesElement = document.createElement('p');
        likesElement.setAttribute("class", "mediaLikes");
        likesElement.setAttribute("id", `likes-${id}`);
        likesElement.textContent = likes;

        const heartElement = document.createElement('img');
        heartElement.setAttribute("src", "assets/icons/heart.svg");
        heartElement.setAttribute("class", "heart");
        heartElement.setAttribute("aria-label", "likes");
        heartElement.setAttribute("alt", "likes");
        heartElement.setAttribute("tabindex", "0");
        heartElement.setAttribute('onclick', `mediasLikes(${id})`);
        heartElement.setAttribute('onkeydown', `keyboardClick(event, ${checkerHearth}, ${id})`);

        const infoElement = document.createElement('div');
        infoElement.setAttribute("class", "mediaInfo");

        const titleElement = document.createElement('h2');
        titleElement.setAttribute("class", "mediaTitle");
        titleElement.setAttribute("tabindex", "0");
        titleElement.textContent = title;

        infoElement.appendChild(titleElement);
        infoElement.appendChild(likesContainer);
        likesContainer.appendChild(likesElement);
        likesContainer.appendChild(heartElement);

        article.appendChild(video);
        article.appendChild(infoElement);

        return (article);
    }

    return { id, photographerId, title, videoPath, likes, date, price, getMediaCardDOM };
}