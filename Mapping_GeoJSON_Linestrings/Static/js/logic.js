// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// We're assigning the variable map to the object L.map(), and we'll instantiate the object with the given string 'mapid'
// The mapid will reference the id tag in our <div> element on the index.html file.
// The setView() method sets the view of the map with a geographical center, where the first coordinate is latitude (40.7) and the second is longitude (-94.5). We set the zoom level of "4" on a scale 0–18.
// An alternative to using the setView() method is to modify each attribute in the map object using the curly braces notation as follows:
//let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
// USING LEAFLET DOCUMENTATION
let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/asliwinski23/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data,{
    style: myStyle,
    onEachFeature: function(feature, layer){
          layer.bindPopup("<h4>" + "Airline: " + feature.properties.airline + "</h4>" + "<hr>" + "<h5>" + "Destination: " + feature.properties.dst + "</h5>")
          } 
        }).addTo(map);
});
