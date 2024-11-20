if (localStorage.items_in_shop != "false") {
    if (localStorage.items_in_shop != "true") {
        localStorage.items_in_shop = "none"
    }
}

if (localStorage.top_selling_item != "false") {
    if (localStorage.top_selling_item != "true") {
        if (localStorage.top_selling_item != "two") {
            localStorage.top_selling_item = "none"
        }
    }
}

if (localStorage.full_client_rework != "false") {
    if (localStorage.full_client_rework != "none") {
        localStorage.full_client_rework = "true"
    }
}