const mainsTab = document.querySelector("[data-mains-template]");
const mainsTabsHolder = document.querySelector("[data-mains-tabs]");

fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/main-tabs')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const card = mainsTab.content.cloneNode(true).children[0];
            const mainstitle = card.querySelector("[data-mains-title]");
            const mainsButton = card;  // Corrected the selection of the button element

            mainstitle.textContent = user.title;

            mainsButton.classList.add(user.class);

            if (user.titleText) {
                mainsButton.title = user.titleText;
            }

            // Set the button's click event to redirect to the URL stored in the API
            mainsButton.onclick = function() {
                window.location.href = user.url;
            };

            // Check if 'isNew' is true, and show the "NEW" icon if it is
            if (user.isNew === "true") {
                card.querySelector(".dm-new-icon").style.display = 'block';
            }

            mainsTabsHolder.append(card);

            document.getElementById("loading-api-dm-mains").classList.add('hidden');
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("loading-api-dm-mains").classList.add('hidden');
        document.getElementById("mains-fetch-error").classList.remove('hidden');
    });

function reFetchMainTabs() {
    document.getElementById("loading-api-dm-mains").classList.remove('hidden');
    document.getElementById("mains-fetch-error").classList.add('hidden');
    const mainsTab = document.querySelector("[data-mains-template]");
    const mainsTabsHolder = document.querySelector("[data-mains-tabs]");

    fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/main-tabs')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const card = mainsTab.content.cloneNode(true).children[0];
                const mainstitle = card.querySelector("[data-mains-title]");
                const mainsButton = card;  // Corrected the selection of the button element

                mainstitle.textContent = user.title;

                mainsButton.classList.add(user.class);

                if (user.titleText) {
                    mainsButton.title = user.titleText;
                }

                // Set the button's click event to redirect to the URL stored in the API
                mainsButton.onclick = function() {
                    window.location.href = user.url;
                };

                // Check if 'isNew' is true, and show the "NEW" icon if it is
                if (user.isNew === "true") {
                    card.querySelector(".dm-new-icon").style.display = 'block';
                }

                mainsTabsHolder.append(card);

                document.getElementById("loading-api-dm-mains").classList.add('hidden');
            });
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById("loading-api-dm-mains").classList.add('hidden');
            document.getElementById("mains-fetch-error").classList.remove('hidden');
        });
}


const NewsTab = document.querySelector("[data-news-template]");
const NewsTabsHolder = document.querySelector("[data-news-tabs]");

fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/news')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const card = NewsTab.content.cloneNode(true).children[0];
            const newstitle = card.querySelector("[data-news-title]");
            const newsButton = card;  // Corrected the selection of the button element

            newstitle.textContent = user.title;

            if (user.titleText) {
                newsButton.title = user.titleText;
            }

            // Set the button's click event to redirect to the URL stored in the API
            newsButton.onclick = function() {
                window.location.href = user.url;
            };

            // Check if 'isNew' is true, and show the "NEW" icon if it is
            if (user.isNew === "true") {
                card.querySelector(".dm-new-icon").style.display = 'block';
            }

            NewsTabsHolder.append(card);

            document.getElementById("loading-api-dm-news").classList.add('hidden');
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("loading-api-dm-news").classList.add('hidden');
        document.getElementById("news-fetch-error").classList.remove('hidden');
    });

function reFetchNewsTabs() {
    document.getElementById("loading-api-dm-news").classList.remove('hidden');
    document.getElementById("news-fetch-error").classList.add('hidden');
    const NewsTab = document.querySelector("[data-news-template]");
    const NewsTabsHolder = document.querySelector("[data-news-tabs]");

    fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/news')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const card = NewsTab.content.cloneNode(true).children[0];
                const newstitle = card.querySelector("[data-news-title]");
                const newsButton = card;  // Corrected the selection of the button element

                newstitle.textContent = user.title;

                if (user.titleText) {
                    newsButton.title = user.titleText;
                }

                // Set the button's click event to redirect to the URL stored in the API
                newsButton.onclick = function() {
                    window.location.href = user.url;
                };

                // Check if 'isNew' is true, and show the "NEW" icon if it is
                if (user.isNew === "true") {
                    card.querySelector(".dm-new-icon").style.display = 'block';
                }

                NewsTabsHolder.append(card);

                document.getElementById("loading-api-dm-news").classList.add('hidden');
            });
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById("loading-api-dm-news").classList.add('hidden');
            document.getElementById("news-fetch-error").classList.remove('hidden');
        });
}


const servers = document.querySelector("[data-servers-template]");
const serversList = document.querySelector("[data-servers]");

fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/servers')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const card = servers.content.cloneNode(true).children[0];
            const serversButton = card;  // Corrected the selection of the button element

            serversButton.classList.add(user.class);

            if (user.titleText) {
                serversButton.title = user.titleText;
            }

            const userImage = card.querySelector("[data-server-icon]");
            userImage.src = user.image;
            userImage.alt = user.title;

            // Set the button's click event to redirect to the URL stored in the API
            serversButton.onclick = function() {
                window.location.href = user.url;
            };

            serversList.append(card);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
    });
