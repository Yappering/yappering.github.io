let apiUrl = 'https://raw.githubusercontent.com/Yappering/api/refs/heads/main/v1/consumables';

// Function to clear the shop data
function clearShopData() {
    const output = document.querySelector("[data-shop-output]");
    output.innerHTML = ''; // Clears the content of the shop category
    document.getElementById("shop-category-loading").classList.remove('hidden');
}

// Function to fetch and display shop data
function fetchData() {

    // Clear the previous data
    clearShopData();

    // Fetch new data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const template = document.querySelector("[data-potion-card-template]");
                const output = document.querySelector("[data-shop-output]");
    
                const category = template.content.cloneNode(true).children[0];

                const banner = category.querySelector("[data-potion-card-holder]");
                banner.id = user.sku_id;
    
                const logoImage = category.querySelector("[data-potion-card-preview-image]");
                logoImage.src = user.preview;
                logoImage.alt = user.name;
    
                const summary = category.querySelector("[data-potion-card-desc]");
                summary.textContent = user.summary;

                const title = category.querySelector("[data-potion-card-title]");
                title.textContent = user.name;

                const price = category.querySelector("[data-potion-card-price]");
                price.textContent = user.price;

                const sku = category.querySelector("[data-potion-card-sku]");
                sku.textContent = 'SKU ID: ' + user.sku_id;

                // Append the category to the output section
                document.getElementById("shop-category-loading").classList.add('hidden');
                output.append(category);
            });

        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById("failed-to-load-shop").classList.remove('hidden');
            document.getElementById("shop-category-loading").classList.add('hidden');
        });
}

// Initial data fetch when the page loads
window.onload = fetchData;