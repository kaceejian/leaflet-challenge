const baseUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?";

const earthquakes = [];

fetch(
  `${baseUrl}format=geojson&starttime=2021-01-01&endtime=2021-10-09&minlatitude=30&maxlatitude=50&minlongitude=110&maxlongitude=130`
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    earthquakes.push(data.features);
  })
  .catch((err) => {
    console.log(err);
  });

console.log(earthquakes);
