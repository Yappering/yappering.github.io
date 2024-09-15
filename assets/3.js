
let apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/profiles-plus';

if (localStorage.unreleased_profiles_plus == "true") {
    if (localStorage.token == "gguihruhgdihgguihruhgdihdriuh37uwgedriuh37uwggguihruhgdihdriuh37uwgee") {
        apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/profiles-plus-u';
    } else {
        apiUrl = '';
        console.error ('403 (forbidden) You are not allowed to display unpublished Profiles Plus items')
    }
}

const template = document.querySelector("[data-shop-category-template]");
const output = document.querySelector("[data-shop-output]");

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const category = template.content.cloneNode(true).children[0];

            const bannerImage = category.querySelector("[data-shop-category-banner-image]");
            bannerImage.src = user.banner;
            bannerImage.alt = user.name;

            const logoImage = category.querySelector("[data-shop-category-logo-image]");
            logoImage.src = user.logo;
            logoImage.alt = user.name;

            const summary = category.querySelector("[data-shop-category-desc]");
            summary.textContent = user.summary;

            if (user.summary_black === "true") {
                category.querySelector(".shop-category-text-holder").style.color = 'black';
            }

            // Handling the logo sway effect
            if (user.logo_sway === "true") {
                category.querySelector("[data-shop-category-logo-image]").classList.add('shop-logo-sway');
            }

            // Handle expiry timer
            const expiryTimer = category.querySelector(".shop-expiry-timer");
            const timerElement = category.querySelector("#shop-expiry-timer");
            const unpublishedAt = new Date(user.unpublished_at);

            if (user.unpublished_at && !isNaN(unpublishedAt.getTime())) {
                expiryTimer.style.display = 'block';

                function updateTimer() {
                    const now = new Date();
                    const timeDiff = unpublishedAt - now;

                    if (timeDiff <= 0) {
                        timerElement.textContent = "Expired";
                        clearInterval(timerInterval);
                    } else {
                        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                        timerElement.textContent = `${days} DAYS LEFT TO REQUEST`;
                    }
                }

                const timerInterval = setInterval(updateTimer, 1000);
                updateTimer(); // Initial call to display the timer immediately
            } else {
                expiryTimer.style.display = 'none';
            }

            const cardHolder = category.querySelector(".shop-category-card-holder");

            // Function to create a card
            function createCard(item, credits, emojiCopy, isBundle = false, isNew = false) {
                const card = document.createElement('div');
                card.classList.add('shop-category-card');
            
                // Determine card class based on item type
                if (item.item_type === 'deco') {
                    card.classList.add('deco-card');
                } else if (item.item_type === 'effect') {
                    card.classList.add('effect-card');
                } else if (isBundle) {
                    card.classList.add('bundle-card');
                }
            
                // Card content based on item type
                if (isBundle && item.bundled_products) {
                    const bundleDescription = `Bundle Includes: ${item.bundled_products.filter(product => product.item_type === 'deco').map(deco => deco.name).join(', ')} Decoration & ${item.bundled_products.filter(product => product.item_type === 'effect').map(effect => effect.name).join(', ')} Profile Effect`;
            
                    card.innerHTML = `
                        <div class="bundle-items">
                            ${item.bundled_products.map(bundledItem => `
                                <div class="bundled-item">
                                    <img src="${bundledItem.static}" class="${bundledItem.item_type}" data-animated="${bundledItem.animated}" alt="${bundledItem.name}">
                                </div>
                            `).join('')}
                        </div>
                        <div class="card-bottom">
                            <a class="item-credits">Made By: ${credits}</a>
                            <h3>${item.name}</h3>
                            <p class="bundle-description shop-card-summary">${bundleDescription}</p>
                        </div>
                        <div class="card-button-container">
                            <button class="card-button ${emojiCopy ? '' : 'card-button-no-emoji'}" onclick="${emojiCopy ? `copyEmoji('${emojiCopy}')` : `redirectToGoogle()`}" title="${emojiCopy ? 'Copy P+ emoji to clipboard' : 'Request item in our Discord server'}">${emojiCopy ? 'Copy P+ Emoji' : 'Request to P+'}</button>
                        </div>
                        <div class="new-item-tag" style="display: ${isNew ? 'block' : 'none'};">NEW</div>
                    `;
            
                } else {
                    card.innerHTML = `
                        <img src="${item.static}" data-animated="${item.animated}" alt="${item.name}">
                        <div class="card-bottom">
                            <a class="item-credits">Made By: ${credits}</a>
                            <h3>${item.name}</h3>
                            <p class="shop-card-summary">${item.summary}</p>
                        </div>
                        <div class="card-button-container">
                            <button class="card-button ${emojiCopy ? '' : 'card-button-no-emoji'}" onclick="${emojiCopy ? `copyEmoji('${emojiCopy}')` : `redirectToGoogle()`}" title="${emojiCopy ? 'Copy P+ emoji to clipboard' : 'Request item in our Discord server'}">${emojiCopy ? 'Copy P+ Emoji' : 'Request to P+'}</button>
                        </div>
                        <div class="new-item-tag" style="display: ${isNew ? 'block' : 'none'};">NEW</div>
                    `;
                }
            
                // Add hover effect for the entire card to animate images
                card.addEventListener('mouseenter', function () {
                    const imgs = card.querySelectorAll('img');
                    imgs.forEach(img => {
                        if (img.hasAttribute('data-animated')) {
                            img.dataset.originalSrc = img.src; // Save original src
                            img.src = img.getAttribute('data-animated'); // Switch to animated src
                        }
                    });
                });
            
                card.addEventListener('mouseleave', function () {
                    const imgs = card.querySelectorAll('img');
                    imgs.forEach(img => {
                        if (img.hasAttribute('data-animated') && img.dataset.originalSrc) {
                            img.src = img.dataset.originalSrc; // Restore original src
                        }
                    });
                });
            
                return card;
            }

            // Sort and display the products: Bundle, Decoration, Effect
            const bundleProducts = [];
            const decorationProducts = [];
            const effectProducts = [];

            user.products.forEach(product => {
                const isNew = product.isNew === "true";
                const credits = product.credits || ""; // Get credits from the product
                const emojiCopy = product.emojiCopy || ""; // Get emojiCopy from the product

                // Check if the product is a bundle
                if (product.bundled_products) {
                    // Add bundle card with bundled items
                    bundleProducts.push({ product, credits, emojiCopy, isNew });
                } else {
                    // Handle individual items
                    product.items.forEach(item => {
                        if (item.item_type === 'deco') {
                            decorationProducts.push({ item, credits, emojiCopy, isNew });
                        } else if (item.item_type === 'effect') {
                            effectProducts.push({ item, credits, emojiCopy, isNew });
                        }
                    });
                }
            });

            // Append Bundle, Decoration, and Effect cards in that order
            bundleProducts.forEach(({ product, credits, emojiCopy, isNew }) => cardHolder.appendChild(createCard(product, credits, emojiCopy, true, isNew)));
            decorationProducts.forEach(({ item, credits, emojiCopy, isNew }) => cardHolder.appendChild(createCard(item, credits, emojiCopy, false, isNew)));
            effectProducts.forEach(({ item, credits, emojiCopy, isNew }) => cardHolder.appendChild(createCard(item, credits, emojiCopy, false, isNew)));

            document.getElementById("shop-category-loading").classList.add('hidden');
            output.append(category);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("failed-to-load-pplus").classList.remove('hidden');
        document.getElementById("shop-category-loading").classList.add('hidden');
    });

// Function to copy emojiCopy to clipboard
function copyEmoji(emojiCopy) {
    if (emojiCopy) {
        navigator.clipboard.writeText(emojiCopy).then(() => {
            console.log('emoji yes');
        }).catch(err => {
            console.error('Failed to copy emoji:', err);
        });
    } else {
        console.error('Failed to copy emoji:', err);
    }
}

// Function to redirect to Google
function redirectToGoogle() {
    window.location.href = 'https://discord.gg/Mcwh7hGcWb';
}


function reFetchProfilesPlus() {
    localStorage.unreleased_profiles_plus = "false"
    location.reload();
}