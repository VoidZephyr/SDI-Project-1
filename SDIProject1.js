// SDIProject1.js

// Search function to fetch artwork based on a search term
    async function searchArtwork() {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`);
        const data = await response.json();


    if (data.objectIDs) {
        displayArtwork(data.objectIDs.slice(0, 5)); // Display the first 5 search results like the first website we made
    } else {
        alert("Try another word"); //if it isn't a word then throw an error
    }
}

async function displayArtwork(ids) {
    const artworkList = document.getElementById('artwork-list');
    artworkList.innerHTML = '';  // Clear the current list before adding new results

    for (let id of ids) {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        const artwork = await response.json();
        
        // Create HTML for each artwork
        const artItem = document.createElement('div');
        artItem.classList.add('art-item');
        artItem.innerHTML = `
            <h3>${artwork.title}</h3>
            <p><strong>Artist:</strong> ${artwork.artistDisplayName || 'Unknown'}</p>
            <img src="${artwork.primaryImageSmall || '#'}" alt="${artwork.title}" width="100%">
        `;

        artworkList.appendChild(artItem);
    }
}

// Add event listener for search button
document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
        searchArtwork(searchInput);
    } else {
        alert("Please enter a search term.");
    }
});
