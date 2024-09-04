

function openLostModal() {
    const lost_modal = document.getElementById('modal-housing');
    lost_modal.innerHTML = `
    <div class="modal-housing-1" id="modal-housing-1">
        <div class="lost-modal">
            <div class="lost-modal-inner">
                <h1 class="center-text" style="font-size: 54px; margin-top: 40px;">You Lost?</h1>
                <h2 style="margin-top: -40px;">We don&#8217;t blame you</h2>
                <p>The new user interface might confuse you if it&#8217;s you&#8217;re first time here, but don&#8217;t worry, the old user interface is still available.</p>
                <p>Getting used to a new user interface can be confusing, that&#8217;s why our team has decided to make an up-to-date version of the old user interface so you can use the same layout you&#8217;re used to with even more features.</p>
                <button class="refresh-button" onclick="location.href='https://old.yapper.shop/';">Use Old UI</button>
                <p>Or feel free to stay and learn the new user interface with a cleaner look just like Discord!</p>
                <button class="refresh-button" onclick="closeLostModal()">Close</button>
            </div>
        </div>
    </div>
`;
}


function openDevModal() {
    const dev_modal = document.getElementById('modal-housing');
    dev_modal.innerHTML = `
    <div class="modal-housing-1" id="modal-housing-1">
        <div class="dev-modal">
            <div class="dev-modal-inner">
                <h1 class="center-text" style="font-size: 54px; margin-top: -10px; margin-bottom: -5px;">Dev Options</h1>
                <button class="refresh-button" onclick="closeDevModal()">Close</button>
                <hr>
                <div>
                    <h2>Experiments</h2>
                    <p class="experiment-subtext">Test out new features</p>
                    <div class="experiment-card-holder">
                        <div class="experiment-card">
                            <p>Show Items That Are Currently In The Discord Shop</p>
                            <p class="experiment-subtext">2024-09_items_in_shop</p>
                            <button class="refresh-button" onclick="itemsCurrentlyInShop1()" id="2024-09_items_in_shop-1">Override 1</button>
                            <button class="refresh-button" onclick="itemsCurrentlyInShop0()" id="2024-09_items_in_shop-0">No Override</button>
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
            </div>
        </div>
    </div>
    `;
    
    
    if (localStorage.items_in_shop == "true") {
        document.getElementById("2024-09_items_in_shop-1").classList.add('refresh-button-selected');
    }
    
    if (localStorage.items_in_shop != "true") {
        document.getElementById("2024-09_items_in_shop-1").classList.remove('refresh-button-selected');
        document.getElementById("2024-09_items_in_shop-0").classList.add('refresh-button-selected');
    }
    
    
    
    if (localStorage.not_found_found == "true") {
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
}


function closeDevModal() {
    const dev_modal = document.getElementById('modal-housing');
    dev_modal.innerHTML = ``;
}

function closeLostModal() {
    const lost_modal = document.getElementById('modal-housing');
    lost_modal.innerHTML = ``;
}



if (localStorage.dev == "true") {
    const dev_tool_button = document.querySelector("#open-dev-tools-button");
    dev_tool_button.style.display = 'block';
}



function itemsCurrentlyInShop0() {
    localStorage.items_in_shop = "false"
    document.getElementById("2024-09_items_in_shop-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-0").classList.add('refresh-button-selected');
}

function itemsCurrentlyInShop1() {
    localStorage.items_in_shop = "true"
    document.getElementById("2024-09_items_in_shop-1").classList.add('refresh-button-selected');
    document.getElementById("2024-09_items_in_shop-0").classList.remove('refresh-button-selected');
}




function secret404ButtonHide() {
    document.getElementById("404-mains-button").classList.add('hidden');
    localStorage.not_found_found = "false"
    console.log('hide 404 button')
    document.getElementById("2024-09_not_found-1").classList.remove('refresh-button-selected');
    document.getElementById("2024-09_not_found-2").classList.add('refresh-button-selected');
}

function secret404ButtonShow() {
    document.getElementById("404-mains-button").classList.remove('hidden');
    localStorage.not_found_found = "true"
    console.log('show 404 button')
    document.getElementById("2024-09_not_found-1").classList.add('refresh-button-selected');
    document.getElementById("2024-09_not_found-2").classList.remove('refresh-button-selected');
}



function unreleasedProfilesPlusItemsFalse() {
    localStorage.unreleased_profiles_plus = "false"
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