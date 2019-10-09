'use strict';

const apiKey = 'Pv4X96oq1aDNqd3p1vRiGzSc11gZi5VJHZq9DK6d';
const searchURL = "https://developer.nps.gov/api/v1/parks";

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const state1 = $('#parkStates1').val();
      const state2 = $('#parkStates2').val();
      const state3 = $('#parkStates3').val();
      const maxResults = $('#js-max-results').val();
      console.log(state1, state2, state3);
      getNationalParks(state1, state2, state3, maxResults);
    });
  }



function getNationalParks(query1, query2, query3, maxResults = 10) {
    $('#results-list').empty();
    let queries = [query1, query2, query3];
    for (var i=0; i<queries.length; i++) {
        let queryString = "api_key=" + apiKey + "&limit=" + maxResults + "&stateCode=" + queries[i];
        

        const url = searchURL + "?" + queryString;
        console.log(url);
        if(queries[i]) {
            fetch(url)
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            })
            .then(responseJson => displayResults(responseJson, queries[i]))
            .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
        }
    }   
}

function displayResults(responseJson, query) {
    console.log(responseJson);
  
    // if there are previous results, remove them
    
    
    //iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
  
      // for each video object in the items 
      // array, add a list item to the results 
      // list with the video title, description,
      // and thumbnail
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href='${responseJson.data[i].url}'>Website</a></p>
        <p>States: ${responseJson.data[i].states}</p>
        </li>`
      )};
  
    // // display the results section  
    $('#results').removeClass('hidden');
  };

    $(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
    });
