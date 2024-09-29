const template = document.querySelector("[data-shop-category-template]");
const output = document.querySelector("[data-shop-output]");

fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/miscellaneous')
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
                        timerElement.textContent = "UNOBTAINABLE";
                        clearInterval(timerInterval);
                    } else {
                        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
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
            function createCard(item, sku, price, priceNitro, isBundle = false, isNew = false) {
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
                            <a class="item-credits">SKU ID: ${sku}</a>
                            <h3>${item.name}</h3>
                            <p class="bundle-description shop-card-summary">${bundleDescription}</p>
                            <div class="shop-price-container">
                                <a style="font-size: large; font-weight: 900;">${price}</a>
                                <a>${priceNitro}</a>
                            </div>
                        </div>
                        <div class="card-button-container">
                            <button title="Unable to confirm if the item has been added to Profiles Plus" class="card-button card-button-disabled">Unable to confirm item availability</button>
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
                                <a>${priceNitro}</a>
                            </div>
                        </div>
                        <div class="card-button-container">
                            <button title="Unable to confirm if the item has been added to Profiles Plus" class="card-button card-button-disabled">Unable to confirm item availability</button>
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
            
                card.addEventListener('click', () => openModal(item, sku, price, priceNitro));

                return card;
            }
                

            // Function to open the modal
            function openModal(item, sku, price, priceNitro) {
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
                                <p>${priceNitro}</p>
                            </div>
                            <div class="modal-buttons">
                                <button title="Unable to confirm if the item has been added to Profiles Plus" class="card-button card-button-disabled">Unable to confirm item availability</button>
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
                
                
                

            // Display the products in the order they appear in the API
            user.products.forEach(product => {
                const isNew = product.isNew === "true";
                const sku = product.sku_id || ""; // Get SKU from the product
                const price = product.price || "";
                const priceNitro = product.price_nitro || "";

                // Check if the product is a bundle
                if (product.bundled_products) {
                    cardHolder.appendChild(createCard(product, sku, price, priceNitro, true, isNew));
                } else {
                    // Handle individual items
                    product.items.forEach(item => {
                        cardHolder.appendChild(createCard(item, sku, price, priceNitro, false, isNew));
                    });
                }
            });

            document.getElementById("shop-category-loading").classList.add('hidden');
            output.append(category);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
        document.getElementById("failed-to-load-shop").classList.remove('hidden');
        document.getElementById("shop-category-loading").classList.add('hidden');
    });
