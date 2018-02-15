google.charts.load('current', {
  'packages':['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': 'AIzaSyD1RT6-B1rLTIoZ8nskv8-w1SHBdoP3bsE'
});
google.charts.setOnLoadCallback(drawRegionsMap);

console.log("entro en el script");


function drawRegionsMap() {

  var data;
  if(country===""){
    data = google.visualization.arrayToDataTable([
      ['Country'],
      [""]
    ]);
  }else{
    data = google.visualization.arrayToDataTable([
      ['Country',result.emotion, result.name],
      [country, result.value, 1]
    ]);

  }
  
  console.log(data);

  var options = {
    region: '150',
    colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
    backgroundColor: '#81d4fa',
    datalessRegionColor: '#f8bbd0'
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}