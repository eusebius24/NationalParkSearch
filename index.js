'use strict';

const apiKey = 'v6e4F3RoWy68c14grm9gI3Bapodn9TxcxTBINxxl';
const searchURL = "https://developer.nps.gov/api/v1/parks";

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      var vals = [];
      $('.stateSelect:checked').each(function(){ //could also use .map here
          vals.push($(this).val());
      });
      
      console.log(vals);
      const maxResults = $('#js-max-results').val();
      
      getNationalParks(vals, maxResults);
    });
  }



function getNationalParks(query, maxResults = 10) {
    $('#results-list').empty();
    $("#js-error-message").empty();
    let queryString = "api_key=" + apiKey + "&limit=" + maxResults + "&stateCode=" + query;
        

        const url = searchURL + "?" + queryString;
        console.log(url);
        
            fetch(url)
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
            })
            .then(responseJson => displayResults(responseJson, query))
            .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
        
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
