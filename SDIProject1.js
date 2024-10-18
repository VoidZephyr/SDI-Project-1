// SDIProject1.js
//push from the mac

// Search function to fetch artwork based on a search term
// FETCH BASICS -> https://youtu.be/cuEtnrL9-H0?si=ba7cBmDr7AAeon3r  
// example of query request from the Art website https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers
//change sunflowers to whatever input to the function to be able to serach the key word.  
async function searchArtwork(query) {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`);
        const data = await response.json();


if (data.objectIDs) {
    displayArtwork(data.objectIDs.slice(0, 5)); // Display the first 5 search results like the first website we made
} else {
    alert("Try another word"); //if it isn't a word then throw an error
}
}


//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function displayArtwork(ids) {
    const artworkList = document.getElementById('artwork-list');
    artworkList.innerHTML = ''; 

//For a list of department IDs, refer to our /departments endpoint:
//https://collectionapi.metmuseum.org/public/collection/v1/departments
//https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]

    for (let id of ids) {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
        const artwork = await response.json();
        //https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        const artItem = document.createElement('div');
        //https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
        artItem.innerHTML = `
            <h3>${artwork.title}</h3>
            <p>Artist:${artwork.artistDisplayName}</p>
            <img src="${artwork.primaryImageSmall}" alt="${artwork.title}">
        `;
    artworkList.appendChild(artItem);
    }
}



// Add event listener for search button
//https://www.w3schools.com/jsref/met_element_addeventlistener.asp

document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
        searchArtwork(searchInput);
    } else {
        alert("Please enter a search term.");
    }
});
