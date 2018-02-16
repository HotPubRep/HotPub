var ctx = document.getElementById("myChart").getContext('2d');

var data = {
  labels: resultsByUser.map(function(i){return i.coordenate_id.country +" / "+ i.emotion.name;}),
  datasets: [{
      label: 'HotPub',
      data: resultsByUser.map(function(i){return i.emotion.value;}),//[12, 19, 3, 5, 2, 3],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
          'rgba(255,99,132,1)'
      ],
      borderWidth: 1
  }]
}

console.log(resultsByUser);
console.log(resultsByUser.map(function(i){return i.emotion.value;}));
//console.log( return resultsByUser.map(i=>{i.emotio.value}));

function getData(){
  
  console.log(resultsByUser);

  //return data;
}

var myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});