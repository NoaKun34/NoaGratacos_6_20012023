function selectFactory(data) {
    const {image, video} = data;
    const dataContainer = document.querySelector(".dataContainer");

    if (image === undefined ) {
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

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("class", "media");
        
        const img = document.createElement('img');
        img.setAttribute("src", imagePath);
        img.setAttribute("alt", title);

        const descContainer = document.createElement('div');
        descContainer.setAttribute("class", "desc");
        
        const infoElement = document.createElement('div');
        infoElement.setAttribute("class", "mediaInfo");
        
        const titleElement = document.createElement('h2');
        titleElement.setAttribute("class", "mediaTitle");
        titleElement.textContent = title;

        const likesContainer = document.createElement('div');
        likesContainer.setAttribute("class", "likesContainer");

        const likesElement = document.createElement('p');
        likesElement.setAttribute("class", "mediaLikes");
        likesElement.textContent = likes;

        const heartElement = document.createElement('img');
        heartElement.setAttribute("src", "assets/icons/heart.svg");
        heartElement.setAttribute("class", "heart");
        
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

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("class", "media");

        const video = document.createElement('video');
        video.setAttribute("src", videoPath);
        video.setAttribute("alt", title);
        video.setAttribute("type", "video/mp4");

        const descContainer = document.createElement('div');
        descContainer.setAttribute("class", "desc");
        
        const likesElement = document.createElement('p');
        likesElement.setAttribute("class", "mediaLikes");
        likesElement.textContent = likes;
        
        const infoElement = document.createElement('div');
        infoElement.setAttribute("class", "mediaInfo");
        
        const titleElement = document.createElement('h2');
        titleElement.setAttribute("class", "mediaTitle");
        titleElement.textContent = title;
        
        infoElement.appendChild(titleElement);
        infoElement.appendChild(likesElement);
        
        article.appendChild(video);
        article.appendChild(infoElement);
        
        return (article);
    }
    
    return { id, photographerId, title, videoPath, likes, date, price, getMediaCardDOM };
}


//function mediaFactory(data) {
//    const {image, video} = data;
//
//    if (image === undefined ) {
//        videoFactory(data);
//    } else if (video === undefined) {
//        imageFactory(data);
//    }
//}