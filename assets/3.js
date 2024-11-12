
let apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/profiles-plus';

const unreleased_profiles_plus_token = localStorage.getItem('token');

if (localStorage.unreleased_profiles_plus == "true") {
    apiUrl = 'https://raw.githubusercontent.com/Yappering/private-api/refs/heads/main/v2/profiles-plus-u';
}

const apiUrlWithToken = `${apiUrl}?token=${unreleased_profiles_plus_token}`;

const template = document.querySelector("[data-shop-category-template]");
const output = document.querySelector("[data-shop-output]");

fetch(apiUrlWithToken)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const category = template.content.cloneNode(true).children[0];

            if (localStorage.epic_pplus_balls == "true") {
                if (user.category_bg != null) {
                    const marketing_bg = category.querySelector("[data-shop-category-marketing-bg]");
                    marketing_bg.src = user.category_bg;
                }
            }

            const banner = category.querySelector("[data-shop-category-banner]");
            banner.id = user.sku_id;

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
            function createCard(item, credits, pplus_id, emojiCopy, isBundle = false, isNew = false) {
                const card = document.createElement('div');
                card.classList.add('shop-category-card');

                card.id = pplus_id;
            
                // Determine card class based on item type
                if (item.item_type === 'deco') {
                    card.classList.add('deco-card');
                } else if (item.item_type === 'effect') {
                    card.classList.add('effect-card');
                } else if (isBundle) {
                    card.classList.add('bundle-card');
                }

                if (localStorage.epic_pplus_balls == "true") {
                    card.classList.add('shop-category-card-transparent');
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
            
                card.addEventListener('click', () => openModal(item, credits, emojiCopy));

                return card;
            }
            
            // Function to open the modal
            function openModal(item, credits, emojiCopy) {
                let description = item.summary; // Default description for non-bundle items
            
                // If the item is a bundle, construct the description
                if (item.bundled_products && Array.isArray(item.bundled_products)) {
                    let decoName = '', effectName = '';
                    
                    // Loop through bundled products to find decoration and effect names
                    item.bundled_products.forEach(bundledItem => {
                        if (bundledItem.item_type === 'deco') {
                            decoName = bundledItem.name;
                        } else if (bundledItem.item_type === 'effect') {
                            effectName = bundledItem.name;
                        }
                    });
            
                    // Create bundle description if both decoration and effect exist
                    if (decoName && effectName) {
                        description = `Bundle Includes: ${decoName} Decoration & ${effectName} Profile Effect`;
                    }
                }
            
                const modalContent = `
                    <div class="modal-content">
                        <div class="modal-left">
                            <h4>Made By: ${credits}</h4>
                            <h3>${item.name}</h3>
                            <p>${description}</p>
                            <div class="modal-left-bottom">
                                <div class="modal-buttons">
                                    <button class="card-button ${emojiCopy ? '' : 'card-button-no-emoji'}" onclick="${emojiCopy ? `copyEmoji('${emojiCopy}')` : `redirectToGoogle()`}" title="${emojiCopy ? 'Copy P+ emoji to clipboard' : 'Request item in our Discord server'}">${emojiCopy ? 'Copy P+ Emoji' : 'Request to P+'}</button>
                                </div>
                            </div>
                        </div>
                        <div class="modal-right">
                            ${item.bundled_products && Array.isArray(item.bundled_products) ? 
                                item.bundled_products.map(bundledItem => `
                                    <div class="bundled-item">
                                        <img src="${bundledItem.static}" 
                                             data-static="${bundledItem.static}"
                                             data-animated="${bundledItem.animated}" 
                                             alt="${bundledItem.name}" 
                                             id="${getImageType(bundledItem)}">
                                    </div>
                                `).join('') : 
                                `<div class="single-item">
                                    <img src="${item.static}" 
                                         data-static="${item.static}"
                                         data-animated="${item.animated}" 
                                         alt="${item.name}" 
                                         id="${getImageType(item)}">
                                </div>`
                            }
                        </div>
                    </div>
                `;
            
                const modal = document.createElement('div');
                modal.classList.add('shop-item-info-modal');
            
                // Append modal content
                modal.innerHTML = modalContent;
            
                // Add show class for animation
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10); // Slight delay to trigger the animation
            
                // Close modal when clicked outside the modal content
                modal.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.classList.remove('show'); // Start close animation
                        modal.addEventListener('transitionend', () => modal.remove()); // Remove after animation
                    }
                });
            
                // Add hover effect for animated images
                const modalRight = modal.querySelector('.modal-right');
                modalRight.addEventListener('mouseenter', () => {
                    modalRight.querySelectorAll('img').forEach(img => {
                        const animatedSrc = img.getAttribute('data-animated');
                        if (animatedSrc) {
                            img.src = animatedSrc; // Change to animated image
                        }
                    });
                });
            
                modalRight.addEventListener('mouseleave', () => {
                    modalRight.querySelectorAll('img').forEach(img => {
                        const staticSrc = img.getAttribute('data-static');
                        if (staticSrc) {
                            img.src = staticSrc; // Revert to static image
                        }
                    });
                });
            
                document.body.appendChild(modal);
            }
            
            // Function to get image type based on item properties
            function getImageType(item) {
                // Check if the item has a type field and return appropriate ID
                if (item.item_type === 'deco') {
                    return 'avatar-decoration'; // Change this to match your needs
                } else if (item.item_type === 'effect') {
                    return 'profile-effect'; // Change this to match your needs
                } else if (item.bundled_products) {
                    return 'bundle'; // For bundles
                }
                return 'unknown-type'; // Fallback for undefined types
            }

            // Sort and display the products: Bundle, Decoration, Effect
            const bundleProducts = [];
            const decorationProducts = [];
            const effectProducts = [];

            user.products.forEach(product => {
                const isNew = product.isNew === "true";
                const credits = product.credits || ""; // Get credits from the product
                const pplus_id = product.pplus_id || "";
                const emojiCopy = product.emojiCopy || ""; // Get emojiCopy from the product

                // Check if the product is a bundle
                if (product.bundled_products) {
                    // Add bundle card with bundled items
                    bundleProducts.push({ product, credits, pplus_id, emojiCopy, isNew });
                } else {
                    // Handle individual items
                    product.items.forEach(item => {
                        if (item.item_type === 'deco') {
                            decorationProducts.push({ item, credits, pplus_id, emojiCopy, isNew });
                        } else if (item.item_type === 'effect') {
                            effectProducts.push({ item, credits, pplus_id, emojiCopy, isNew });
                        }
                    });
                }
            });

            // Append Bundle, Decoration, and Effect cards in that order
            bundleProducts.forEach(({ product, credits, pplus_id, emojiCopy, isNew }) => cardHolder.appendChild(createCard(product, credits, pplus_id, emojiCopy, true, isNew)));
            decorationProducts.forEach(({ item, credits, pplus_id, emojiCopy, isNew }) => cardHolder.appendChild(createCard(item, credits, pplus_id, emojiCopy, false, isNew)));
            effectProducts.forEach(({ item, credits, pplus_id, emojiCopy, isNew }) => cardHolder.appendChild(createCard(item, credits, pplus_id, emojiCopy, false, isNew)));

            document.getElementById("shop-category-loading").classList.add('hidden');
            output.append(category);
        });

        if (localStorage.epic_pplus_balls == "true") {
            const paper_beach2 = document.getElementById('profiles-plus-8');
            if (paper_beach2) {  // Check if element exists
                document.getElementById('profiles-plus-8').innerHTML = `
                <img class="shop-category-condensed-banner-img" src="https://cdn.yapper.shop/assets/5.png">
                <div class="shop-category-condensed-logo-holder" style="left: 15%;">
                    <img class="shop-category-banner-logo shop-logo-sway" src="https://cdn.yapper.shop/assets/1.png" id="shop-banner-logo">
                </div>
                `;
            }
    
            const windowkill2 = document.getElementById('profiles-plus-4');
            if (windowkill2) {  // Check if element exists
                document.getElementById('profiles-plus-4').innerHTML = `
                <img class="shop-category-condensed-banner-img" src="https://cdn.yapper.shop/assets/87.png">
                <div class="shop-category-condensed-logo-holder" style="right: -15%;">
                    <img class="shop-category-banner-logo" src="https://cdn.yapper.shop/assets/53.png" id="shop-banner-logo">
                </div>
                `;
            }

            const paper_beach = document.getElementById('profiles-plus-3');
            if (paper_beach) {  // Check if element exists
                document.getElementById('profiles-plus-3').innerHTML = `
                <img class="shop-category-condensed-banner-img" src="https://cdn.yapper.shop/assets/5.png">
                <div class="shop-category-condensed-logo-holder" style="left: 15%;">
                    <img class="shop-category-banner-logo" src="https://cdn.yapper.shop/assets/1.png" id="shop-banner-logo">
                </div>
                `;
            }

            const bopl_battle = document.getElementById('profiles-plus-2');
            if (bopl_battle) {  // Check if element exists
                document.getElementById('profiles-plus-2').innerHTML = `
                <img class="shop-category-condensed-banner-img" src="https://cdn.yapper.shop/assets/93.png">
                <div class="shop-category-condensed-logo-holder" style="right: -6%;">
                    <img class="shop-category-banner-logo" src="https://cdn.yapper.shop/assets/60.png" id="shop-banner-logo">
                </div>
                `;
            }
        }

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