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
  var depthMultiplier = 0.03;

  for (var earthquake of earthquakes) {
    //   draw a dot
    var circle = L.circle(
      [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]],
      {
        color: "green",
        // fillColor: d3
        //   .color("lightgreen")
        //   .darker(earthquake.geometry.coordinates[2] * depthMultiplier)
        //   .formatHex(),
        fillColor: d3.interpolateRdYlGn(
          1 - earthquake.geometry.coordinates[2] / 90
        ),
        fillOpacity: 1,
        radius: 10000 * earthquake.properties.mag,
      }
    ).addTo(myMap);
  }
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function (Map) {
    var div = L.DomUtil.create("div", "legend");
    // var legendColor = d3.color("lightgreen");
    div.innerHTML += "<h4>Depth</h4>";
    div.innerHTML += `<i style="background: ${d3.interpolateRdYlGn(
      1
    )}"></i><span>0</span><br>`;
    div.innerHTML += `<i style="background: ${d3.interpolateRdYlGn(
      1 - 10 / 90
    )}"></i><span>10</span><br>`;
    div.innerHTML += `<i style="background: ${d3.interpolateRdYlGn(
      1 - 30 / 90
    )}"></i><span>30</span><br>`;
    div.innerHTML += `<i style="background: ${d3.interpolateRdYlGn(
      1 - 50 / 90
    )}"></i><span>50</span><br>`;
    div.innerHTML += `<i style="background: ${d3.interpolateRdYlGn(
      1 - 70 / 90
    )}"></i><span>70</span><br>`;
    div.innerHTML += `<i style="background: ${d3.interpolateRdYlGn(
      1 - 90 / 90
    )}"></i><span>90+</span><br>`;
    return div;
  };
  legend.addTo(myMap);
}
