const formatPrice = (amount) => {
    const amountStr = amount.toString();
    return amountStr.slice(0, -2) + '.' + amountStr.slice(-2);
};

let apiUrl = 'https://canary.discord.com/api/v9/store/published-listings/skus?application_id=1096190356233670716';

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
            // Sort data by id in descending order (smallest id at the bottom)
            const sortedData = data.sort((b, a) => a.sku.id - b.sku.id);

            sortedData.forEach(user => {
                const template = document.querySelector("[data-potion-card-template]");
                const output = document.querySelector("[data-shop-output]");

                const category = template.content.cloneNode(true).children[0];

                const banner = category.querySelector("[data-potion-card-holder]");
                banner.id = user.sku_id;

                const summary = category.querySelector("[data-potion-card-desc]");
                summary.textContent = user.summary;

                const title = category.querySelector("[data-potion-card-title]");
                title.textContent = user.sku.name;

                const price = category.querySelector("[data-potion-card-price]");
                // Display "US$" only if a valid price amount is present
                price.textContent = user?.sku?.price?.amount
                    ? 'US$' + formatPrice(user.sku.price.amount)
                    : 'UNAVAILABLE';

                const sku = category.querySelector("[data-potion-card-sku]");
                sku.textContent = 'SKU ID: ' + user.sku.id;

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
