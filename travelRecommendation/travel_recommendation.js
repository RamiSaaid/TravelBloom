let data; // Declare a variable to hold the fetched data

// Fetch the JSON data
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  
    })
    .then(fetchedData => {
        data = fetchedData; // Store the data in the variable
        console.log(data); // Optional: log the data to check if it's loaded
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function search() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    // Keywords to search for
    const keywords = ['beach', 'temple', 'country'];

    if (keywords.includes(input)) {
        let results = '';

        // Check for 'beach' keyword
        if (input === 'beach') {
            results += '<h3>Beach Destinations:</h3>';
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.description.toLowerCase().includes('beach')) {
                        results += `
                            <div class="result-item">
                                <img src="${city.imageUrl}" alt="${city.name}" style="width: 100%; max-width: 300px;">
                                <p>${city.name}, ${country.name}: ${city.description}</p>
                            </div>
                        `;
                    }
                });
            });
        }

        // Check for 'temple' keyword
        if (input === 'temple') {
            results += '<h3>Temple Destinations:</h3>';
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.description.toLowerCase().includes('temple')) {
                        results += `
                            <div class="result-item">
                                <img src="${city.imageUrl}" alt="${city.name}" style="width: 100%; max-width: 300px;">
                                <p>${city.name}, ${country.name}: ${city.description}</p>
                            </div>
                        `;
                    }
                });
            });
        }

        // Check for 'country' keyword
        if (input === 'country') {
            results += '<h3>Countries:</h3>';
            data.countries.forEach(country => {
                results += `<p>${country.name}</p>`;
            });
        }

        // Display results
        if (results) {
            resultsDiv.innerHTML = results;
        } else {
            resultsDiv.innerHTML = '<p>No results found for your search.</p>';
        }
    } else {
        resultsDiv.innerHTML = '<p>No results found. Please try "beach," "temple," or "country."</p>';
    }
}

// Clear input function
function clearInput() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = ''; // Clear results
}

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', search);