setTimeout(() => { document.getElementById("modal-housing").classList.remove('hidden'); }, 100);

function closeLostModal() {
    document.getElementById("modal-housing").classList.add('hidden');
    localStorage.sa_found = "true"
}

if (localStorage.sa_found == "true") {
    document.getElementById("modal-housing").classList.add('modal-lost-found');
}
