
$('#form').on("submit", async function(e) {
    e.preventDefault();

    // Retrieve results using api key and search (q) per giphy docs
    const params = {params: {api_key: 'nkvNfv01Iydf5LibW3lNmQJhJDiHcdDV', q: $('#input').val()}};
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', params);

    addGIF(res);

    // Reset input
    $('#input').val('');
});

function addGIF(res) {
    // Total results array
    const totalResults = res.data.data.length;

    // Only if results are retrieved
    if (totalResults) {
        // Randomize index of total returned results array
        let randomIndex = Math.floor(Math.random() * totalResults);

        // Create new div with bootstrap sizing.
        let $newDiv = $('<div>', {class: "col-4 mb-4"});

        // Access the ORIGINAL url of the gif. Adjust size.
        let $newGIF = $('<img>', {
            src: res.data.data[randomIndex].images.original.url, 
            alt: res.data.data.title, 
            class: 'w-100'});

        //Append to DOM
        $newDiv.append($newGIF);
        $('#results').append($newDiv);
    }
}

// Remove Button to clear results
$('#removeBtn').on('click', function() {
    $('#results').empty();
});