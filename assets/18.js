let apiUrl = 'https://raw.githubusercontent.com/Yappering/api/main/v1/collectible-assets';

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

            data.forEach(user => {
                const template = document.querySelector("[data-shop-category-template]");
                const output = document.querySelector("[data-shop-output]");

                const category = template.content.cloneNode(true).children[0];
    
                const bannerImage = category.querySelector("[data-shop-category-banner-image]");
                bannerImage.src = user.banner;
    
                const logoImage = category.querySelector("[data-shop-category-logo-image]");
                logoImage.src = user.logo;

                const hero_logo = category.querySelector("[data-shop-category-hero_logo-image]");
                hero_logo.src = user.hero_logo;

                const logoImage1 = category.querySelector("[data-shop-category-logo-image-1]");
                logoImage1.src = user.logo;

                const mobile_bg = category.querySelector("[data-shop-category-mobile_bg-image]");
                mobile_bg.src = user.mobile_bg;

                const pdp_bg = category.querySelector("[data-shop-category-pdp_bg-image]");
                pdp_bg.src = user.pdp_bg;

                const success_modal_bg = category.querySelector("[data-shop-category-success_modal_bg-image]");
                success_modal_bg.src = user.success_modal_bg;

                const mobile_banner = category.querySelector("[data-shop-category-mobile_banner-image]");
                mobile_banner.src = user.mobile_banner;

                const featured_block = category.querySelector("[data-shop-category-featured_block-image]");
                featured_block.src = user.featured_block;

                const hero_banner = category.querySelector("[data-shop-category-hero_banner-image]");
                hero_banner.src = user.hero_banner;
                
                output.append(category);
            });
            document.querySelectorAll('.shop-category-assets-holder').forEach(element => {
                element.addEventListener('click', function() {
                  this.classList.toggle('expanded');
                });
            });
            document.getElementById("shop-category-loading").classList.add('hidden');

        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById("failed-to-load-shop").classList.remove('hidden');
            document.getElementById("shop-category-loading").classList.add('hidden');
        });
}

// Initial data fetch when the page loads
window.onload = fetchData;
