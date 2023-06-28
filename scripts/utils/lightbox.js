const lightboxContainer = document.querySelector('.lightboxContainer');
const lightboxImage = document.querySelector('#lightboxContentImg');
const lightboxVideo = document.querySelector('#lightboxContentVideo');
const lightboxMediaTitle = document.querySelector('#lightboxContentTitle');
let actualMediaId = null;

function previousMedia() {
    const currentMediaIndex = mediaTable.findIndex(media => media.id === actualMediaId);
    const previousMediaIndex = currentMediaIndex - 1;
    if (previousMediaIndex < 0) {
        return null;
    } else {
        let previousMedia = mediaTable[previousMediaIndex].id;
        openLightbox(previousMedia);
        return mediaTable[previousMediaIndex];
    }
}

function nextMedia() {
    const currentMediaIndex = mediaTable.findIndex(media => media.id === actualMediaId);
    const nextMediaIndex = currentMediaIndex + 1;
    if (nextMediaIndex >= mediaTable.length) {
        return null;
    } else {
        let nextMedia = mediaTable[nextMediaIndex].id;
        openLightbox(nextMedia);
        return mediaTable[nextMediaIndex];
    }
}

function closeLightbox() {
    lightboxContainer.style.display = 'none';
    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';

    document.removeEventListener('keydown', keyboardHandler);
}

function searchMediaId(id) {
    for (let i = 0; i < mediaTable.length; i++) {
        if (mediaTable[i].id === id) {
            return mediaTable[i];
        }
    }
    return null;
}

function keyboardHandler(event) {
    if (event.key === 'ArrowLeft') {
        previousMedia();
        console.log("ArrowLeft");
    } else if (event.key === 'ArrowRight') {
        nextMedia();
        console.log("ArrowRight");
    } else if (event.key === 'Escape') {
        closeLightbox();
        console.log("Escape");
    }
}

function openLightbox(mediaId) {
    const { image, video } = searchMediaId(mediaId);
    actualMediaId = mediaId;

    if (video === undefined) {
        let media = searchMediaId(mediaId);
        let imagePath = `assets/photos/${photographerID}/${media.image}`;

        lightboxVideo.style.display = 'none';
        lightboxContainer.style.display = 'block';
        lightboxImage.style.display = 'block';
        lightboxImage.src = imagePath;
        lightboxImage.setAttribute("alt", media.title);
        lightboxImage.setAttribute("aria-label", media.title);
        lightboxMediaTitle.textContent = media.title;
    } else if (image === undefined) {
        let media = searchMediaId(mediaId);
        let videoPath = `assets/photos/${photographerID}/${media.video}`;

        lightboxImage.style.display = 'none';
        lightboxContainer.style.display = 'block';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = videoPath;
        lightboxVideo.setAttribute("alt", media.title);
        lightboxVideo.setAttribute("aria-label", media.title);
        lightboxMediaTitle.textContent = media.title;
    }

    document.addEventListener('keydown', keyboardHandler);
}