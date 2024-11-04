
let apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/home-page-preview';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const template = document.querySelector("[data-shop-category-template]");
            const output = document.querySelector("[data-shop-output]");

            const category = template.content.cloneNode(true).children[0];

            const bannerImage = category.querySelector("[data-shop-category-banner-image]");
            bannerImage.src = user.hero_banner;
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

            const previewCategoryButton = category.querySelector("[data-preview-new-categoey-button]");

            const newCategoryName = user.name;

            previewCategoryButton.innerHTML = `
                <button class="home-page-preview-button" onclick="location.href='/shop';">Shop the ${newCategoryName} Collection</button>
            `;

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
                                <a>${priceNitro} with Nitro</a>
                            </div>
                        </div>
                        <div class="card-button-container">
                            <button class="card-button" onclick="location.href='https://discord.com/shop#itemSkuId=${sku}';" title="Open this item in the Discord Shop">Open In Shop</button>
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
                            <button class="card-button" onclick="location.href='https://discord.com/shop#itemSkuId=${sku}';" title="Open this item in the Discord Shop">Open In Shop</button>
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

            output.append(category);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
    });


let apiUrlplus = 'https://raw.githubusercontent.com/Yappering/api/main/v1/home-page-p-plus';

fetch(apiUrlplus)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const template = document.querySelector("[data-shop-category-template-plus]");
            const output = document.querySelector("[data-shop-output-plus]");

            const category = template.content.cloneNode(true).children[0];

            const oneImage = category.querySelector("[data-shop-preview-image-plus]");
            oneImage.src = user.src;
            oneImage.alt = user.name;

            output.append(category);
        });

    })
    .catch(error => {
        console.error('Error fetching the API:', error);
    });



let apiUrlp = 'https://raw.githubusercontent.com/Yappering/api/main/v1/popular-picks';

fetch(apiUrlp)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const template = document.querySelector("[data-shop-category-template-p]");
            const output = document.querySelector("[data-shop-output-p]");

            const category = template.content.cloneNode(true).children[0];

            const bannerImage = category.querySelector("[data-shop-category-banner-image-p]");
            bannerImage.src = user.banner;
            bannerImage.alt = user.name;

            const logoImage = category.querySelector("[data-shop-category-logo-image-p]");
            logoImage.src = user.logo;
            logoImage.alt = user.name;

            const summary = category.querySelector("[data-shop-category-desc-p]");
            summary.textContent = user.summary;

            if (user.summary_black === "true") {
                category.querySelector(".shop-category-text-holder").style.color = 'black';
            }

            // Handling the logo sway effect
            if (user.logo_sway === "true") {
                category.querySelector("[data-shop-category-logo-image-p]").classList.add('shop-logo-sway');
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
                                <a>${priceNitro} with Nitro</a>
                            </div>
                        </div>
                        <div class="card-button-container">
                            <button class="card-button" onclick="location.href='https://discord.com/shop#itemSkuId=${sku}';" title="Open this item in the Discord Shop">Open In Shop</button>
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
                            <button class="card-button" onclick="location.href='https://discord.com/shop#itemSkuId=${sku}';" title="Open this item in the Discord Shop">Open In Shop</button>
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

            output.append(category);
        });
    })
    .catch(error => {
        console.error('Error fetching the API:', error);
    });
