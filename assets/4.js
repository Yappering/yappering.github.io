const open_help_modals_buttons_holder = document.getElementById('open-help-modals-buttons-holder');
    open_help_modals_buttons_holder.innerHTML = `
    <svg title="Help" x="0" y="0" onclick="openLostModal()" id="open-lost-tools-button" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"></path></svg>
    <svg title="Dev Tools" x="0" y="0" onclick="openDevModal()" style="display: none;" id="open-dev-tools-button" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2 20.59V19.4a1 1 0 0 1 .3-.7l2.4-2.42a1 1 0 0 1 .71-.29H6l9-9-.85-.85a1 1 0 0 1-.23-.34l-1.49-3.73a.5.5 0 0 1 .65-.65l3.73 1.5a1 1 0 0 1 .34.22l.64.64a1 1 0 0 1 1.42 0l1 1a1 1 0 0 1 0 1.42l1.58 1.58a1 1 0 0 1 0 1.42l-1.58 1.58a1 1 0 0 1-1.42 0L17 9l-9 9v.59a1 1 0 0 1-.3.7l-2.4 2.42a1 1 0 0 1-.71.29H3.4a1 1 0 0 1-.7-.3l-.42-.4a1 1 0 0 1-.29-.71Z" class=""></path><path fill="currentColor" d="M8.23 10.23c.2.2.51.2.7 0l1.3-1.3a.5.5 0 0 0 0-.7L6.5 4.5l.3-.3a1 1 0 0 0 0-1.4l-.5-.5c-.2-.2-.45-.3-.7-.22-.43.14-1.17.49-2.1 1.42a5.37 5.37 0 0 0-1.42 2.1c-.08.25.03.5.21.7l.5.5a1 1 0 0 0 1.42 0l.29-.3 3.73 3.73ZM13.77 15.06a.5.5 0 0 0 0 .7l1.73 1.74 1.44 2.4a1 1 0 0 0 .15.19l1.73 1.73c.1.1.26.1.36 0l2.64-2.64c.1-.1.1-.26 0-.36L20.1 17.1a1 1 0 0 0-.2-.15L17.5 15.5l-1.73-1.73a.5.5 0 0 0-.7 0l-1.3 1.3Z" class=""></path></svg>
    <svg title="Options" x="0" y="0" onclick="openOptionsModal()" id="open-options-tools-button" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.4483 8.3333H18.3333V11.6667H16.4492C16.2483 12.4425 15.9167 13.165 15.4708 13.8033L16.6667 15 15 16.6667 13.8042 15.47C13.1642 15.9158 12.4433 16.2483 11.6667 16.4483V18.3333H8.3333V16.4483C7.5575 16.2483 6.8358 15.9158 6.1967 15.47L5 16.6667 3.3333 15 4.53 13.8033C4.0842 13.1658 3.7517 12.4433 3.5517 11.6667H1.6667V8.3333H3.5517C3.7517 7.5567 4.0833 6.835 4.53 6.1967L3.3333 5 5 3.3333 6.1967 4.53C6.835 4.0833 7.5567 3.7517 8.3333 3.5517V1.6667H11.6667V3.5508C12.4433 3.7517 13.1642 4.0833 13.8042 4.5292L15 3.3325 16.6667 4.9992 15.47 6.1967C15.9158 6.835 16.2483 7.5575 16.4483 8.3333ZM10 13.3333C11.8409 13.3333 13.3333 11.8409 13.3333 10 13.3333 8.159 11.8409 6.6667 10 6.6667 8.159 6.6667 6.6667 8.159 6.6667 10 6.6667 11.8409 8.159 13.3333 10 13.3333Z")></path></svg>
    <svg title="Downloads" x="0" y="0" onclick="openDownloadsModal()" id="open-downloads-button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3837 15.2952V20.7776H3.61379V15.2952H0.390625V22.3892C0.390625 23.2787 1.11115 24 2.00461 24H21.9929C22.8855 24 23.6068 23.2795 23.6068 22.3892V15.2952H20.3837Z" fill="white"/><path d="M11.7028 14.7516L7.08818 9.17553C7.08818 9.17553 6.38607 8.51264 7.14742 8.51264C7.90878 8.51264 9.74773 8.51264 9.74773 8.51264C9.74773 8.51264 9.74773 8.06672 9.74773 7.37901C9.74773 5.41837 9.74773 1.85016 9.74773 0.39549C9.74773 0.39549 9.64445 0 10.2401 0C10.8405 0 13.4705 0 13.9004 0C14.3295 0 14.3199 0.333044 14.3199 0.333044C14.3199 1.74368 14.3199 5.43519 14.3199 7.33178C14.3199 7.94663 14.3199 8.34532 14.3199 8.34532C14.3199 8.34532 15.7946 8.34532 16.72 8.34532C17.6439 8.34532 16.9482 9.03943 16.9482 9.03943C16.9482 9.03943 13.0221 14.2513 12.4745 14.7981C12.0806 15.1943 11.7028 14.7516 11.7028 14.7516Z" fill="white"/></svg>
`;

function openLostModal() {
    const lost_modal = document.getElementById('modal-housing');
    lost_modal.innerHTML = `
    <div class="modal-housing-1" id="modal-housing-1">
        <div class="lost-modal">
            <div class="lost-modal-inner">
                <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Help</h1>
                Old user interface:
                <button class="refresh-button" onclick="location.href='https://old.yapper.shop/';">Old UI</button>
                <hr style="opacity: 0">
                Discord Server:
                <button class="refresh-button" onclick="location.href='https://discord.gg/Mcwh7hGcWb/';">Discord</button>
                <hr style="opacity: 0">
                Github:
                <button class="refresh-button" onclick="location.href='https://github.com/Yappering/';">Github</button>
                <hr style="opacity: 0">
                Trella on Youtube:
                <button class="refresh-button" onclick="location.href='https://www.youtube.com/@Trell_ie';">Youtube</button>
                <hr style="opacity: 0">
                DTACat on Youtube:
                <button class="refresh-button" onclick="location.href='https://www.youtube.com/@DTACat';">Youtube</button>
                <hr style="opacity: 0">
                <button class="refresh-button" onclick="closeLostModal()">Close</button>
                <hr style="opacity: 0">
                App Version: Stable 122
            </div>
        </div>
    </div>
`;
}

function openMobileModal() {
    const lost_modal = document.getElementById('modal-housing');
    lost_modal.innerHTML = `
    <div class="modal-housing-1" id="modal-housing-1">
        <div class="lost-modal">
            <div class="lost-modal-inner">
                <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Looks like you're on mobile</h1>
                <p>Would you like to use the mobile client?</p>
                <button class="refresh-button" onclick="location.href='https://m.yapper.shop/';">Yes</button>
                <button class="refresh-button" onclick="closeMobileModal()">No</button>
            </div>
        </div>
    </div>
`;
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    openMobileModal()
}

function openOptionsModal() {
    const options_modal = document.getElementById('modal-housing');
    options_modal.innerHTML = `
    <div class="modal-housing-1" id="modal-housing-1">
        <div class="lost-modal">
            <div class="lost-modal-inner">
                <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Options</h1>
                <div>
                    <div class="experiment-card-holder">
                        <div class="experiment-card" id="is-in-shop-box-option">
                            <p>Shop: Hide removed items</p>
                            <p class="experiment-subtext">This will hide all categories that are not currently in the shop</p>
                            <input class="options-toggle-box" onclick="inShopIsChecked();" style="cursor: pointer; scale: 2; posision: center;" id="is-in-shop-box" type="checkbox">
                        </div>
                        <div class="experiment-card">
                            <p>Shop: Hide bundles</p>
                            <p class="experiment-subtext">This will hide all bundles in the shop page</p>
                            <input class="options-toggle-box" onclick="noBundlesInShopIsChecked();" style="cursor: pointer; scale: 2; posision: center;" id="no-bundles-in-shop-box" type="checkbox">
                        </div>
                    </div>
                </div>
                <button class="refresh-button" onclick="closeLostModal()">Close</button>
            </div>
        </div>
    </div>
    `;

    if (localStorage.items_in_shop_yes == "true") {
        document.getElementById("is-in-shop-box").checked = true;
    }

    if (localStorage.items_in_shop_yes == "none") {
        document.getElementById("is-in-shop-box").checked = true;
    }

    if (localStorage.items_in_shop != "true") {
        if (localStorage.items_in_shop != "none") {
            document.getElementById("is-in-shop-box-option").style.display = 'none';
        }
    }


    if (localStorage.shop_have_no_bundles == "true") {
        document.getElementById("no-bundles-in-shop-box").checked = true;
    }
}

function inShopIsChecked() {
    if (localStorage.items_in_shop_yes != "true") {
        localStorage.items_in_shop_yes = "true"
    }
    else {
        localStorage.items_in_shop_yes = "false"
    }
    if (typeof fetchData === 'function') {
        fetchData();
    }
}

function noBundlesInShopIsChecked() {
    if (localStorage.shop_have_no_bundles != "true") {
        localStorage.shop_have_no_bundles = "true"
    }
    else {
        localStorage.shop_have_no_bundles = "false"
    }
    if (typeof fetchData === 'function') {
        fetchData();
    }
}

function openDownloadsModal() {
    const downloads_modal = document.getElementById('modal-housing');
    downloads_modal.innerHTML = `
    <div class="modal-housing-1" id="modal-housing-1">
        <div class="dev-modal">
            <div class="dev-modal-inner">
                <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">Manual Downloads</h1>
                <p style="margin-top: -50px;">Experimental</p>
                <div>
                    <div class="experiment-card-holder">
                    <template id="downloadables-api-template">
                        <div class="item experiment-card">
                            <p class="name"></p>
                            <p class="summary experiment-subtext"></p>
                            <div class="downloadables"></div>
                        </div>
                    </template>
                    <div class="experiment-card-holder" id="downloadables-output"></div>
                </div>
                <button class="refresh-button" onclick="closeLostModal()">Close</button>
            </div>
        </div>
    </div>
    `;
    
    // Fetch the data from the API
    fetch('https://raw.githubusercontent.com/Yappering/api/main/v1/downloadable-data')
        .then(response => response.json())
        .then(data => {
            // Call the function to display the data
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
        });
        
        // Function to display the data in the HTML
        function displayData(data) {
        const content = document.getElementById('downloadables-output');
        const template = document.getElementById('downloadables-api-template');
        
        data.forEach(item => {
            // Clone the template
            const clone = template.content.cloneNode(true);
        
            // Fill in the name and summary
            clone.querySelector('.name').textContent = item.name;
            clone.querySelector('.summary').textContent = item.summary;
        
            // Add buttons for downloadables
            const downloadablesDiv = clone.querySelector('.downloadables');
            item.downloadables.forEach(downloadable => {
                const button = document.createElement('button');
                button.textContent = downloadable.name;
                button.classList.add('card-button');
                button.addEventListener('click', () => {
                    window.open(downloadable.url, '_blank');
                });
                downloadablesDiv.appendChild(button);
            });
        
            // Append the cloned template to the content
            content.appendChild(clone);
        });
    }

}


function openDevModal() {
    if (localStorage.dev == "true") {
        const dev_modal = document.getElementById('modal-housing');
        dev_modal.innerHTML = `
        <div class="modal-housing-1" id="modal-housing-1">
            <div class="dev-modal">
                <div class="dev-modal-inner">
                    <h1 class="center-text" style="font-size: 54px; margin-top: -10px; margin-bottom: -5px;">Dev Options</h1>
                    <button class="refresh-button" onclick="closeDevModal()">Close</button>
                    <button class="refresh-button" onclick="turnOffDevMode()">Safe Mode</button>
                    <hr>
                    <div>
                        <h2>Experiments</h2>
                        <p class="experiment-subtext">Test out new features</p>
                        <div class="experiment-card-holder">


                            <div class="experiment-card">
                                <p>Epic Profiles Plus Category Changes</p>
                                <p class="experiment-subtext">2024-11_epic_profiles_plus_category_changes</p>
                                <button class="refresh-button" onclick="epicProfilesPlusCategoryChanges1()" id="2024-11_epic_profiles_plus_category_changes-1">Override 1</button>
                                <button class="refresh-button" onclick="epicProfilesPlusCategoryChanges0()" id="2024-11_epic_profiles_plus_category_changes-0">No Override</button>
                                <button class="refresh-button" onclick="epicProfilesPlusCategoryChanges00()" id="2024-11_epic_profiles_plus_category_changes-00">Override -1</button>
                            </div>
    
    
                            <div class="experiment-card">
                                <p>Top Selling Item Tag</p>
                                <p class="experiment-subtext">2024-11_top_selling_item_tag</p>
                                <button class="refresh-button" onclick="topSellingItemTag2()" id="2024-11_top_selling_item_tag-2" title="show popular tag on all items">Override 2</button>
                                <button class="refresh-button" onclick="topSellingItemTag1()" id="2024-11_top_selling_item_tag-1" title="show popular tag on popular items">Override 1</button>
                                <button class="refresh-button" onclick="topSellingItemTag0()" id="2024-11_top_selling_item_tag-0">No Override</button>
                                <button class="refresh-button" onclick="topSellingItemTag00()" id="2024-11_top_selling_item_tag-00">Override -1</button>
                            </div>
    
    
                            <div class="experiment-card">
                                <p>Item Data Downloads</p>
                                <p class="experiment-subtext">2024-11_item_data_downloads</p>
                                <button class="refresh-button" onclick="itemDataDownloads2()" id="2024-11_item_data_downloads-2" title="show download button on modal and card">Override 2</button>
                                <button class="refresh-button" onclick="itemDataDownloads1()" id="2024-11_item_data_downloads-1" title="show download button on modal">Override 1</button>
                                <button class="refresh-button" onclick="itemDataDownloads0()" id="2024-11_item_data_downloads-0">No Override</button>
                                <button class="refresh-button" onclick="itemDataDownloads00()" id="2024-11_item_data_downloads-00">Override -1</button>
                            </div>
    
    
                            <div class="experiment-card">
                                <p>Show Items That Are Currently In The Discord Shop</p>
                                <p class="experiment-subtext">2024-09_items_in_shop</p>
                                <button class="refresh-button" onclick="itemsCurrentlyInShop1()" id="2024-09_items_in_shop-1">Override 1</button>
                                <button class="refresh-button" onclick="itemsCurrentlyInShop0()" id="2024-09_items_in_shop-0">No Override</button>
                                <button class="refresh-button" onclick="itemsCurrentlyInShop00()" id="2024-09_items_in_shop-00">Override -1</button>
                            </div>
    
                            
                        </div>
                    </div>
                    <hr>
                    <div>
                        <h2>Modals</h2>
                        <div class="experiment-card-holder">
                            <div class="experiment-card">
                                <p>Lost</p>
                                <button class="refresh-button" onclick="openLostModal()">Open</button>
                            </div>
                            <div class="experiment-card">
                                <p>Dev</p>
                                <button class="refresh-button" onclick="openDevModal()">Open</button>
                            </div>
                            <div class="experiment-card">
                                <p>Options</p>
                                <button class="refresh-button" onclick="openOptionsModal()">Open</button>
                            </div>
                            <div class="experiment-card">
                                <p>Downloads</p>
                                <button class="refresh-button" onclick="openDownloadsModal()">Open</button>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div>
                        <h2>Debug</h2>
                        <p class="experiment-subtext">Overrides</p>
                        <div class="experiment-card-holder">
                            <div class="experiment-card">
                                <p>Unreleased Profiles Plus Items</p>
                                <p class="experiment-subtext">2024-09_profiles_plus</p>
                                <button class="refresh-button" onclick="unreleasedProfilesPlusItemsTrue()" id="2024-09_profiles_plus-1">Override 1</button>
                                <button class="refresh-button" onclick="unreleasedProfilesPlusItemsFalse()" id="2024-09_profiles_plus-2">No Override</button>
                            </div>
                            <div class="experiment-card">
                                <p>Show 404 Button</p>
                                <p class="experiment-subtext">2024-09_not_found</p>
                                <button class="refresh-button" onclick="secret404ButtonShow()" id="2024-09_not_found-1">Override 1</button>
                                <button class="refresh-button" onclick="secret404ButtonHide()" id="2024-09_not_found-2">No Override</button>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div>
                        <h2>Local Storage Overrides</h2>
                        <p class="experiment-subtext">Refresh the page for changes to take effect</p>
                        <button class="refresh-button" style="opacity: 0; pointer-events: none;">Save</button>
                        <input type="text" class="dev-local-storage-input-1" id="keyInput" placeholder="Enter key">
                        <input type="text" class="dev-local-storage-input-1" id="valueInput" placeholder="Enter value">
                        <button class="refresh-button" onclick="saveToLocalStorage()">Save</button>
                        <div id="storageItems"></div>
                    </div>
                    <hr>
                    <button class="refresh-button" onclick="closeDevModal()">Close</button>
                    <button class="refresh-button" onclick="turnOffDevMode()">Safe Mode</button>
                </div>
            </div>
        </div>
        `;



        if (localStorage.epic_pplus_balls == "true") {
            document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.add('refresh-button-selected');
            document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
        }
        
        if (localStorage.epic_pplus_balls != "true") {
            if (localStorage.epic_pplus_balls != "false") {
                document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.add('refresh-button-selected');
                document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
            }
        }
    
        if (localStorage.epic_pplus_balls == "false") {
            document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.add('refresh-button-selected');
        }

    
    
        if (localStorage.top_selling_item != "true") {
            if (localStorage.top_selling_item != "false") {
                if (localStorage.top_selling_item != "two") {
                    document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
                    document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
                    document.getElementById("2024-11_top_selling_item_tag-0").classList.add('refresh-button-selected');
                    document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
                }
            }
        }
    
        if (localStorage.top_selling_item == "two") {
            document.getElementById("2024-11_top_selling_item_tag-2").classList.add('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
        }
        
        if (localStorage.top_selling_item == "true") {
            document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-1").classList.add('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
        }
    
        if (localStorage.top_selling_item == "false") {
            document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_top_selling_item_tag-00").classList.add('refresh-button-selected');
        }
    
    
    
        if (localStorage.item_data_downloads != "true") {
            if (localStorage.item_data_downloads != "false") {
                if (localStorage.item_data_downloads != "two") {
                    document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
                    document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
                    document.getElementById("2024-11_item_data_downloads-0").classList.add('refresh-button-selected');
                    document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
                }
            }
        }
    
        if (localStorage.item_data_downloads == "two") {
            document.getElementById("2024-11_item_data_downloads-2").classList.add('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
        }
        
        if (localStorage.item_data_downloads == "true") {
            document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-1").classList.add('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
        }
        
        if (localStorage.item_data_downloads == "false") {
            document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-11_item_data_downloads-00").classList.add('refresh-button-selected');
        }
    
    
        
        
        if (localStorage.items_in_shop == "true") {
            document.getElementById("2024-09_items_in_shop-1").classList.add('refresh-button-selected');
            document.getElementById("2024-09_items_in_shop-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-09_items_in_shop-00").classList.remove('refresh-button-selected');
        }
        
        if (localStorage.items_in_shop != "true") {
            if (localStorage.items_in_shop != "false") {
                document.getElementById("2024-09_items_in_shop-1").classList.remove('refresh-button-selected');
                document.getElementById("2024-09_items_in_shop-0").classList.add('refresh-button-selected');
                document.getElementById("2024-09_items_in_shop-00").classList.remove('refresh-button-selected');
            }
        }
    
        if (localStorage.items_in_shop == "false") {
            document.getElementById("2024-09_items_in_shop-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-09_items_in_shop-0").classList.remove('refresh-button-selected');
            document.getElementById("2024-09_items_in_shop-00").classList.add('refresh-button-selected');
        }
        
        
        
        if (localStorage.not_found_found == "true") {
            const fourohfour = document.getElementById("404-mains-button");
        if (fourohfour) {  // Check if element exists
            if (localStorage.not_found_found == "true") {
                document.getElementById("404-mains-button").classList.remove('hidden');
            }
        }
            document.getElementById("2024-09_not_found-1").classList.add('refresh-button-selected');
        }
        
        if (localStorage.not_found_found != "true") {
            document.getElementById("2024-09_not_found-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-09_not_found-2").classList.add('refresh-button-selected');
        }
        
        
        if (localStorage.unreleased_profiles_plus == "true") {
            document.getElementById("2024-09_profiles_plus-1").classList.add('refresh-button-selected');
        }
        
        if (localStorage.unreleased_profiles_plus != "true") {
            document.getElementById("2024-09_profiles_plus-1").classList.remove('refresh-button-selected');
            document.getElementById("2024-09_profiles_plus-2").classList.add('refresh-button-selected');
        }
    
        displayLocalStorage();
    }else {
        console.error('403 (Forbidden)')
    }
}


function closeDevModal() {
    const dev_modal = document.getElementById('modal-housing');
    dev_modal.innerHTML = ``;
}

function closeMobileModal() {
    const mobile_modal = document.getElementById('modal-housing');
    mobile_modal.innerHTML = ``;
}

function closeLostModal() {
    const lost_modal = document.getElementById('modal-housing');
    lost_modal.innerHTML = ``;
}



if (localStorage.dev == "true") {
    const dev_tool_button = document.querySelector("#open-dev-tools-button");
    dev_tool_button.style.display = 'block';
}


const fourohfour = document.getElementById("404-mains-button");
if (fourohfour) {  // Check if element exists
    if (localStorage.not_found_found == "true") {
        document.getElementById("404-mains-button").classList.remove('hidden');
    }
}


function turnOffDevMode() {
    localStorage.dev = "false"
    location.reload();
}

function dev() {
    localStorage.dev = "true"
    location.reload();
}


function epicProfilesPlusCategoryChanges0() {
    localStorage.epic_pplus_balls = "none"
    document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.add('refresh-button-selected');
    document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
}

function epicProfilesPlusCategoryChanges1() {
    localStorage.epic_pplus_balls = "true"
    document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.add('refresh-button-selected');
    document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.remove('refresh-button-selected');
}

function epicProfilesPlusCategoryChanges00() {
    localStorage.epic_pplus_balls = "false"
    document.getElementById("2024-11_epic_profiles_plus_category_changes-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_epic_profiles_plus_category_changes-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_epic_profiles_plus_category_changes-00").classList.add('refresh-button-selected');
}



function topSellingItemTag2() {
    localStorage.top_selling_item = "two"
    document.getElementById("2024-11_top_selling_item_tag-2").classList.add('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
}

function topSellingItemTag1() {
    localStorage.top_selling_item = "true"
    document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-1").classList.add('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
}

function topSellingItemTag0() {
    localStorage.top_selling_item = "none"
    document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-0").classList.add('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-00").classList.remove('refresh-button-selected');
}

function topSellingItemTag00() {
    localStorage.top_selling_item = "false"
    document.getElementById("2024-11_top_selling_item_tag-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_top_selling_item_tag-00").classList.add('refresh-button-selected');
}




function itemDataDownloads2() {
    localStorage.item_data_downloads = "two"
    document.getElementById("2024-11_item_data_downloads-2").classList.add('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
}

function itemDataDownloads1() {
    localStorage.item_data_downloads = "true"
    document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.add('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
}

function itemDataDownloads0() {
    localStorage.item_data_downloads = "none"
    document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.add('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
}

function itemDataDownloads00() {
    localStorage.item_data_downloads = "false"
    document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.add('refresh-button-selected');
}





function itemDataDownloads2() {
    localStorage.item_data_downloads = "two"
    document.getElementById("2024-11_item_data_downloads-2").classList.add('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
}

function itemDataDownloads1() {
    localStorage.item_data_downloads = "true"
    document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.add('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
}

function itemDataDownloads0() {
    localStorage.item_data_downloads = "none"
    document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.add('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.remove('refresh-button-selected');
}

function itemDataDownloads00() {
    localStorage.item_data_downloads = "false"
    document.getElementById("2024-11_item_data_downloads-2").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-11_item_data_downloads-00").classList.add('refresh-button-selected');
}






function itemsCurrentlyInShop0() {
    localStorage.items_in_shop = "none"
    document.getElementById("2024-09_items_in_shop-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-0").classList.add('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-00").classList.remove('refresh-button-selected');
}

function itemsCurrentlyInShop1() {
    localStorage.items_in_shop = "true"
    document.getElementById("2024-09_items_in_shop-1").classList.add('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-00").classList.remove('refresh-button-selected');
}

function itemsCurrentlyInShop00() {
    localStorage.items_in_shop = "false"
    document.getElementById("2024-09_items_in_shop-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-0").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-00").classList.add('refresh-button-selected');
}




function secret404ButtonHide() {
    const fourohfour = document.getElementById("404-mains-button");
    if (fourohfour) {  // Check if element exists
        if (localStorage.not_found_found == "true") {
            document.getElementById("404-mains-button").classList.add('hidden');
        }
    }
    localStorage.not_found_found = "none"
    console.log('hide 404 button')
    document.getElementById("2024-09_not_found-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_not_found-2").classList.add('refresh-button-selected');
}

function secret404ButtonShow() {
    const fourohfour = document.getElementById("404-mains-button");
    if (fourohfour) {  // Check if element exists
        if (localStorage.not_found_found == "true") {
            document.getElementById("404-mains-button").classList.remove('hidden');
        }
    }
    localStorage.not_found_found = "true"
    console.log('show 404 button')
    document.getElementById("2024-09_not_found-1").classList.add('refresh-button-selected');
    document.getElementById("2024-09_not_found-2").classList.remove('refresh-button-selected');
}



function unreleasedProfilesPlusItemsFalse() {
    localStorage.unreleased_profiles_plus = "none"
    console.log('hide Unreleased Profiles Plus Items')
    document.getElementById("2024-09_profiles_plus-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_profiles_plus-2").classList.add('refresh-button-selected');
}

function unreleasedProfilesPlusItemsTrue() {
    localStorage.unreleased_profiles_plus = "true"
    console.log('show Unreleased Profiles Plus Items')
    document.getElementById("2024-09_profiles_plus-1").classList.add('refresh-button-selected');
    document.getElementById("2024-09_profiles_plus-2").classList.remove('refresh-button-selected');
}




function saveToLocalStorage() {
    // Get the values from the inputs
    const key = document.getElementById('keyInput').value;
    const value = document.getElementById('valueInput').value;
    
    // Save to local storage
    localStorage.setItem(key, value);
    
    // Refresh the display
    displayLocalStorage();
}
    
function displayLocalStorage() {
    // Get the container element
    const storageItems = document.getElementById('storageItems');
    
    // Clear the container
    storageItems.innerHTML = '';
    
    // Iterate over all items in local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        // Create a container for each item
        const itemDiv = document.createElement('div');
        
        // Create editable input fields for key and value
        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.value = key;
        keyInput.disabled = true; // Disable key editing
        keyInput.className = 'dev-local-storage-input-2';
        
        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.value = value;
        valueInput.className = 'dev-local-storage-input-3';
        
        // Save button for each item
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Update';
        saveButton.className = 'refresh-button';
        saveButton.onclick = function() {
            localStorage.setItem(key, valueInput.value);
        };
        
        // Delete button for each item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'refresh-button';
        deleteButton.onclick = function() {
            localStorage.removeItem(key);
            displayLocalStorage(); // Refresh the display
        };
        
        // Append elements to the item div
        itemDiv.appendChild(deleteButton);
        itemDiv.appendChild(keyInput);
        itemDiv.appendChild(valueInput);
        itemDiv.appendChild(saveButton);
        
        // Append the item div to the container
        storageItems.appendChild(itemDiv);
    }
}