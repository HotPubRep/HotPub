require('../../logic/classifier');
var JSON = require('../../countries.json');


google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyD1RT6-B1rLTIoZ8nskv8-w1SHBdoP3bsE'
});
google.charts.setOnLoadCallback(drawRegionsMap);


function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country','Emotion'],
    ['Spain', 0.678]
  ]);

  console.log(data);

  var options = {
    colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
    backgroundColor: '#81d4fa'
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}