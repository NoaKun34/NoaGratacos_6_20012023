function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photos/photographers_selfi/${portrait}`;
    const location = `${city}, ${country}`;
    const tjm = `${price}€/jour`;

    console.log("Test dans la fonction photographerFactory");

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("id", "photographerContainer");
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const link = document.createElement('a');
        link.href = `../../photographer.html?id=${id}`;
        link.setAttribute("aria-label", name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const locationElement = document.createElement('p');
        locationElement.setAttribute("id", "location");
        locationElement.setAttribute("class", "desc");
        locationElement.textContent = location;
        const taglineElement = document.createElement('p');
        taglineElement.setAttribute("id", "tagline");
        taglineElement.setAttribute("class", "desc");
        taglineElement.textContent = tagline;
        const tjmElement = document.createElement('p');
        tjmElement.setAttribute("id", "tjm");
        tjmElement.setAttribute("class", "desc");
        tjmElement.textContent = tjm;

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(locationElement);
        article.appendChild(taglineElement);
        article.appendChild(tjmElement);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}