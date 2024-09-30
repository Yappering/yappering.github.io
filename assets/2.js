let apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/collectibles';

// Function to clear the shop data
function clearShopData() {
    const output = document.querySelector("[data-shop-output]");
    output.innerHTML = ''; // Clears the content of the shop category
    document.getElementById("shop-category-loading").classList.remove('hidden');
}

// Function to fetch and display shop data
function fetchData() {
    document.getElementById("shop-category-loading").classList.remove('hidden');
    if (localStorage.items_in_shop_yes == "true") {
        apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/collectibles-in-shop';
    } else {
        apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/collectibles';
    }

    // Clear the previous data
    clearShopData();

    // Fetch new data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const template = document.querySelector("[data-shop-category-template]");
                const output = document.querySelector("[data-shop-output]");
    
                const category = template.content.cloneNode(true).children[0];

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
                            timerElement.textContent = "UNOBTAINABLE";
                            clearInterval(timerInterval);
                        } else {
                            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / 1000);
    
                            timerElement.textContent = `${days} DAYS LEFT IN SHOP`;
                        }
                    }
    
                    const timerInterval = setInterval(updateTimer, 1000);
                    updateTimer(); // Initial call to display the timer immediately
                } else {
                    expiryTimer.style.display = 'none';
                }
    
                const cardHolder = category.querySelector(".shop-category-card-holder");
    
                // Function to create a card
                function createCard(item, sku, price, priceNitro, emojiCopy, isBundle = false, isNew = false) {
                    const card = document.createElement('div');
                    card.classList.add('shop-category-card');

                    card.id = sku;
                
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
                                <a class="item-credits">SKU ID: ${sku}</a>
                                <h3>${item.name}</h3>
                                <p class="bundle-description shop-card-summary">${bundleDescription}</p>
                                <div class="shop-price-container">
                                    <a style="font-size: large; font-weight: 900;">${price}</a>
                                    <a>${priceNitro} with Nitro</a>
                                </div>
                            </div>
                            <div class="card-button-container">
                                <button class="card-button" title="Open item in the Discord shop" onclick="location.href='https://discord.com/shop#itemSkuId=${sku}';">Open In Shop</button>
                            </div>
                            <div class="new-item-tag" style="display: ${isNew ? 'block' : 'none'};">NEW</div>
                        `;
    
                    } else {
                        card.innerHTML = `
                            <img src="${item.static}" data-animated="${item.animated}" alt="${item.name}">
                            <div class="card-bottom">
                                <a class="item-credits">SKU ID: ${sku}</a>
                                <h3>${item.name}</h3>
                                <p class="shop-card-summary">${item.summary}</p>
                                <div class="shop-price-container">
                                    <a style="font-size: large; font-weight: 900;">${price}</a>
                                    <a>${priceNitro} with Nitro</a>
                                </div>
                            </div>
                            <div class="card-button-container">
                                <button class="card-button" title="Open item in the Discord shop" onclick="location.href='https://discord.com/shop#itemSkuId=${sku}';">Open In Shop</button>
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
    
                    card.addEventListener('click', () => openModal(item, sku, price, priceNitro, emojiCopy));

                    return card;
                }
                

                // Function to open the modal
                function openModal(item, sku, price, priceNitro, emojiCopy) {
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
                                <h4>SKU ID: ${sku}</h4>
                                <h3>${item.name}</h3>
                                <p>${description}</p>
                                <div class="modal-prices">
                                    <p style="font-weight: bold;">${price}</p>
                                    <p>${priceNitro} with Nitro</p>
                                </div>
                                <div class="modal-buttons">
                                    <button class="card-button" title="Open item in the Discord shop" onclick="location.href='https://discord.com/shop#itemSkuId=${sku}';">Open In Shop</button>
                                    <button class="card-button ${emojiCopy ? '' : 'card-button-no-emoji'}" onclick="${emojiCopy ? `copyEmoji('${emojiCopy}')` : `redirectToGoogle()`}" title="${emojiCopy ? 'Copy P+ emoji to clipboard' : 'Request item in our Discord server'}">${emojiCopy ? 'Copy P+ Emoji' : 'Request to P+'}</button>
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
                    const sku = product.sku_id || ""; // Get credits from the product
                    const price = product.price || "";
                    const priceNitro = product.price_nitro || "";
                    const emojiCopy = product.emojiCopy || ""; // Get emojiCopy from the product
    
                    // Check if the product is a bundle
                    if (product.bundled_products) {
                        // Add bundle card with bundled items
                        bundleProducts.push({ product, sku, price, priceNitro, emojiCopy, isNew });
                    } else {
                        // Handle individual items
                        product.items.forEach(item => {
                            if (item.item_type === 'deco') {
                                decorationProducts.push({ item, sku, price, priceNitro, emojiCopy, isNew });
                            } else if (item.item_type === 'effect') {
                                effectProducts.push({ item, sku, price, priceNitro, emojiCopy, isNew });
                            }
                        });
                    }
                });

                // Display bundles first
                if (localStorage.shop_have_no_bundles != "true") {
                    bundleProducts.forEach(({ product, sku, price, priceNitro, emojiCopy, isNew }) => {
                        const card = createCard(product, sku, price, priceNitro, emojiCopy, true, isNew);
                        cardHolder.append(card);
                    });
                }

                // Then display decoration products
                decorationProducts.forEach(({ item, sku, price, priceNitro, emojiCopy, isNew }) => {
                    const card = createCard(item, sku, price, priceNitro, emojiCopy, false, isNew);
                    cardHolder.append(card);
                });

                // Finally, display effect products
                effectProducts.forEach(({ item, sku, price, priceNitro, emojiCopy, isNew }) => {
                    const card = createCard(item, sku, price, priceNitro, emojiCopy, false, isNew);
                    cardHolder.append(card);
                });

                // Append the category to the output section
                document.getElementById("shop-category-loading").classList.add('hidden');
                output.append(category);
            });

            const street_fighter_banner = document.getElementById('1285465421339693076');
            if (street_fighter_banner) {  // Check if element exists
                document.getElementById('1285465421339693076').innerHTML = `
                <img class="shop-category-banner-img" src="https://cdn.discordapp.com/app-assets/1096190356233670716/1285465421356732426.png?size=4096" data-shop-category-banner-image="" alt="Street Fighter 6">
                <img class="shop-category-banner-img" style="position: absolute;" src="https://cdn.yapper.shop/discord-assets/19.png">
                <div class="shop-category-text-holder">
                    <p style="font-size: 18px;" data-shop-category-desc="">Hit the streets with Street Fighter.</p>
                </div>
                `;
            }
            const palworld_banner = document.getElementById('1252404112650407998');
            if (palworld_banner) {  // Check if element exists
                document.getElementById('1252404112650407998').innerHTML = `
                <img class="shop-category-banner-img" src="https://cdn.yapper.shop/discord-assets/15.jpg" data-shop-category-banner-image="" alt="Palworld">
                <img class="shop-category-banner-img" style="position: absolute;" src="https://cdn.yapper.shop/discord-assets/14.png">
                <img style="position: absolute; left: 0px; bottom: 0px; width: 400px;" src="https://cdn.yapper.shop/discord-assets/12.png">
                <img style="position: absolute; right: 0px; bottom: 0px; width: 400px;" src="https://cdn.yapper.shop/discord-assets/13.png">
                <div class="shop-category-logo-holder">
                    <img class="shop-category-banner-logo" src="https://cdn.yapper.shop/discord-assets/9.png" id="shop-banner-logo" data-shop-category-logo-image="" alt="Palworld">
                </div>
                <div class="shop-category-text-holder">
                    <p style="font-size: 18px;" data-shop-category-desc="">New island, new Pals, new adventures!</p>
                </div>
                `;
            }
            const valorant_banner = document.getElementById('1220513972189663413');
            if (valorant_banner) {  // Check if element exists
                document.getElementById('1220513972189663413').innerHTML = `
                <div class="shop-category-banner-img" style="background: rgb(255, 70, 85);" data-shop-category-banner-image="" alt="VALORANT"></div>
                <img class="shop-category-banner-img" style="position: absolute;" src="https://cdn.yapper.shop/discord-assets/24.png">
                <img style="position: absolute; left: 0px; bottom: 0px; width: 1280px;" src="https://cdn.yapper.shop/discord-assets/20.png">
                <img style="position: absolute; right: 0px; bottom: 0px; width: 1280px;" src="https://cdn.yapper.shop/discord-assets/22.png">
                <div class="shop-category-logo-holder">
                    <img class="shop-category-banner-logo" src="https://cdn.yapper.shop/discord-assets/21.png" id="shop-banner-logo" data-shop-category-logo-image="" alt="Palworld">
                </div>
                <div class="shop-category-text-holder">
                    <p style="font-size: 18px;" data-shop-category-desc="">DEFY DEFINITION</p>
                </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById("failed-to-load-shop").classList.remove('hidden');
            document.getElementById("shop-category-loading").classList.add('hidden');
        });
}

// Function to copy the emoji to clipboard
function copyEmoji(emoji) {
    navigator.clipboard.writeText(emoji).then(() => {
        alert('Emoji copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy emoji:', err);
    });
}

// Redirect to Google if emojiCopy is null
function redirectToGoogle() {
    window.location.href = 'https://discord.gg/Mcwh7hGcWb';
}

// Initial data fetch when the page loads
window.onload = fetchData;