// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// We're assigning the variable map to the object L.map(), and we'll instantiate the object with the given string 'mapid'
// The mapid will reference the id tag in our <div> element on the index.html file.
// The setView() method sets the view of the map with a geographical center, where the first coordinate is latitude (40.7) and the second is longitude (-94.5). We set the zoom level of "4" on a scale 0–18.
// An alternative to using the setView() method is to modify each attribute in the map object using the curly braces notation as follows:
let map = L.map('mapid').setView([39.8283, -98.5795], 4);

// We create the tile layer that will be the background of our map.
// USING LEAFLET DOCUMENTATION
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Get data from cities.js
let cityData = cities;

  // Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location,{
        radius: city.population/100000,
        color: "pink",
        fillColor: "orange"
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
   });