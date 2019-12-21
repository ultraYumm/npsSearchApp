'use strict';

/*curl -X GET "https://developer.nps.gov/api/v1/parks?stateCode=CA&limit=2&api_key=uZ5OJUvj06yr5WCchqb0ppDZ7flQbPnFLsVcEk0e" -H "accept: application/json"*/

const state = $('#state').val();
const maxNumber = $('#maxNumber').val();

function getParks(state, limit=maxNumber) {
  
  let searchURL = "https://developer.nps.gov/api/v1/parks" 
  let apiKey = 'uZ5OJUvj06yr5WCchqb0ppDZ7flQbPnFLsVcEk0e'
  
  

  const params = {
    stateCode: state,
    limit: maxNumber,
    api_key: apiKey,
  };
  
  const queryString = formatQueryParams(params)
  const newUrl = searchURL + '?' + queryString;

    console.log(newUrl);
  
    fetch(newUrl)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Sorry, there are no results for the code you entered.'));
};

function displayResults(responseJson) {
  console.log(responseJson);
  if (responseJson.total === '0') {
    $('#results').addClass('hidden');
    $("h2").text("Sorry, there are no National Parks in this state!");
  } 
  else {
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h4>${responseJson.data[i].fullName}</h4></li><ul>
      <li>${responseJson.data[i].description}</li>
      <li><a href="${responseJson.data[i].url}" >Website</a></li>
      </ul>
      </li>`
    );
    $("h3").text("Here's Your List:")}
    $("h2").text("");
  $('#results').removeClass('hidden');

}
}


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#state').val();
    const maxNumber = $('#maxNumber').val();
    debugger;
    
    var stateArray = state.trim().split(" ")
    for (let j=0; j < stateArray.length; j++) {
    console.log(getParks(stateArray[j]), maxNumber);

    }
  
   
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});


/*console.log(state);
console.log(state[1]);

console.log(state.trim().split(" "))

var stateArray = state.trim().split(" ")
console.log(stateArray[0]);
*/




