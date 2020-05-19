// (NEW) Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// (NEW) Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

// (NEW)
function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> Magnitude: " + feature.properties.mag + 
      "</h3><hr><h3>Earthquake Date & Time:</h3><p>" + new Date(feature.properties.time) + "</p>" + "</h3><hr><h3>Location:</h3>" + feature.properties.place);
  }
// (NEW) Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

// Sending our earthquakes layer to the createMap function
createMap(earthquakes);
}
function createMap(earthquakes) {
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };
  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };
  // Create the map object with options
  var map = L.map("map-id", {
    center: [44.3232, -115.1673],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });
  // Add Legend


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

//(comment out)function createMarkers(response) {

  // Pull the "stations" property off of response.data
  //(comment out)var stations = response.data.stations;

  // Initialize an array to hold bike markers
  //(comment out)var bikeMarkers = [];

  // Loop through the stations array
  //(comment out)for (var index = 0; index < stations.length; index++) {
    //(comment out)var station = stations[index];

    // For each station, create a marker and bind a popup with the station's name
    //(comment out)var bikeMarker = L.marker([station.lat, station.lon])
      //(comment out).bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

    // Add the marker to the bikeMarkers array
    //(comment out)bikeMarkers.push(bikeMarker);
  //(comment out)}

  // Create a layer group made from the bike markers array, pass it into the createMap function
  //(comment out)createMap(L.layerGroup(bikeMarkers));
//(comment out)}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// (comment out)//d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json", createMarkers);
// (comment out)//d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);