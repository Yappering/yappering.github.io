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


const messageTemplate = document.querySelector("[data-blog-message-template]");
const messageOutput = document.querySelector("[data-blog-messages-output]");
    
fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/news')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const message = messageTemplate.content.cloneNode(true).children[0];
            
            const newstitle = message.querySelector("[data-news-title]");
            newstitle.textContent = user.title;

            const messageTime = message.querySelector("[data-blog-message-time]");
            messageTime.textContent = user.message_time;

            if (user.isNew === "true") {
                message.querySelector(".new-item-tag-1").style.display = 'block';
            }

            const messageContentOne = message.querySelector("[data-blog-message-content-1]");
            messageContentOne.textContent = user.message_content_1;

            const messageContentTwo = message.querySelector("[data-blog-message-content-2]");
            messageContentTwo.textContent = user.message_content_2;

            const messageContentThree = message.querySelector("[data-blog-message-content-3]");
            messageContentThree.textContent = user.message_content_3;

            messageOutput.append(message);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
    });