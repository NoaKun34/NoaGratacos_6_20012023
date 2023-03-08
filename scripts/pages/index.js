    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
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
    };

    async function init() {
        // Récupère les datas des photographes
        console.log("test début fonction Init");
        const { photographers } = await getPhotographers();
        console.log("test milieu de fonction Init");
        displayData(photographers);
        console.log("test fin fonction Init");
    };
    
    init();
    
