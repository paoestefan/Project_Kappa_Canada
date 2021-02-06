let map = L.map('map').setView([56.139058654572004, -97.42785644727543], 3.8); 
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic3dpbW1lcjIwMjEiLCJhIjoiY2trN2twaWw4MDJjdjJwbnNmODJhNnZhbiJ9.s3GEXBxC-KHLvDaHKGtugQ'
}).addTo(map);

// Use this link to get the geojson data.
let link = "canada.geojson";

// Function that will determine the color of a neighborhood based on the NAME it belongs to
function chooseColor(NAME) {
  switch (NAME) {
  case "Alberta":
    return "yellow";
  case "Saskatchewan":
    return "red";
  case "Manitoba":
    return "orange";
  case "Newfoundland  & Labrador":
    return "green";
  case "Prince Edward Island":
    return "purple";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on NAME)
        fillColor: chooseColor(feature.properties.NAME),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.NAME + "</h1> <hr> <h2>" + feature.properties.NAME + "</h2>");

    }
  }).addTo(map);
});
