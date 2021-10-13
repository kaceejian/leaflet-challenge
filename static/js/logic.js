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
  var myMap = L.map("map").setView([51.505, -0.09], 13);
}
