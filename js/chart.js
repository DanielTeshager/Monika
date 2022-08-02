// t = []
// h = []
// time = []
//get data from server
function getData(path='') {
    fetch('http://127.0.0.1:5000/' + path)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            t = data["temp"]
            h = data["humidity"]
            time = data["time"]
            if (path == "") {
                drawGraph()
                updateSensorCard(h[h.length-1], t[t.length-1])
            }
            else{
               updateSensorCard(h, t)
            }
            // drawGraph()
        })
        .catch(error => console.log(error)); 
}

// update sensor card
function updateSensorCard(h, t) {
    document.querySelector('#hum_value').innerHTML = h
    document.querySelector('#temp_value').innerHTML = t
}

document.addEventListener('DOMContentLoaded', function() {
    //get data from server
    getData('')
    //update divs with data
 });


//refresh the page
setInterval(function() {
    getData('/current_temp_humidity')
    // drawGraph()
}, 5000);


//update graph
function drawGraph(){
 

    var options = {
        chart: {
          height: 380,
          width: "100%",
          type: "line"
        },
        series: [
          {
            name: "Temperature",
            data: t
          },
            {
            name: "Humidity",
            data: h
          }
        ],
        xaxis: {
          categories: time
        }
      };
      
      var chart = new ApexCharts(document.querySelector("#lineChart"), options);
      
      chart.render();

}



  
