fetch(baseUrl)
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    draw(data.features);
  })
  .catch((err) => {
    console.log(err);
  });

function draw(earthquakes) {
  console.log(earthquakes);
  var myMap = L.map("map").setView([51.505, -0.09], 1.75);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: mapBoxKey,
    }
  ).addTo(myMap);

  for (var earthquake of earthquakes) {
    //   draw a dot
    var circle = L.circle(
      [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]],
      {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 5000 * earthquake.properties.mag,
      }
    ).addTo(myMap);
  }
}
