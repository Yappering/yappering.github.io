// Force rollout for Items In Shop experiment
if (localStorage.items_in_shop != "false") {
    if (localStorage.items_in_shop != "true") {
        localStorage.items_in_shop = "none"
    }
}

// Force rollout for Top Selling Item Tag experiment
if (localStorage.top_selling_item != "false") {
    if (localStorage.top_selling_item != "true") {
        if (localStorage.top_selling_item != "two") {
            localStorage.top_selling_item = "none"
        }
    }
}

// Force rollout for Full Client Rework experiment
if (localStorage.full_client_rework != "false") {
    if (localStorage.full_client_rework != "true") {
        localStorage.full_client_rework = "none"
    }
}

// Force rollout for API Designed URL experiment
if (localStorage.api_designed_url != "false") {
    if (localStorage.api_designed_url != "true") {
        localStorage.api_designed_url = "none"
    }
}