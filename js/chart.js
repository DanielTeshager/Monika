//get data from server
function getData(path='', show_loading=true) {
    var loader = document.querySelector('.loader')
    if (show_loading) {
        loader.style.display = 'block'
    }
    fetch('http://127.0.0.1:5000/' + path)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none'
            console.log(data)
            t = data["temp"]
            h = data["humidity"]
            time = data["time"]
            if (path == "") {
                drawGraph()
                updateSensorCard(h[h.length-1], t[t.length-1])
            }
            else{
               //build sensor cards
               console.log(data[0])
               builSensorCards(data)
            }
            // drawGraph()
        })
        .catch(error => console.log(error)); 
}
//build sensor cards
function builSensorCards(data){
    var sensorCards = document.querySelector('.sensor-cards')
    new_card = ''
    for (var i = 0; i < data.length; i++) {

        sensorName = Object.keys(data[i])[0]
        sensorData =  data[i][sensorName]
        readingDate = Object.keys(sensorData)[0]
        temperature = Object(sensorData)[readingDate]['T']
        humidity = Object(sensorData)[readingDate]['H']

        var sensorCards = document.querySelector('.sensor-cards')
        inner_html = `<div class="sensor-card"><div class="temp">
                    <h3 id="temp_value">${temperature}</h3><h4>°C</h4></div>
                    <div class="hum"><h3 id="hum_value">${humidity}</h3>
                    <h4>%</h4></div><div class="sensor_detail">
                    <p class="sensor_name">${sensorName}</p></div></div>`
        new_card += inner_html
    }
    sensorCards.innerHTML = new_card

}
// update sensor card
function updateSensorCard(h, t) {
    document.querySelector('#hum_value').innerHTML = h
    document.querySelector('#temp_value').innerHTML = t
}

document.addEventListener('DOMContentLoaded', function() {
    //get data from server
    getData('/current_temp_humidity')
    //update divs with data
    activateSensorCards()
 });


//refresh the page
setInterval(function() {
    getData('/current_temp_humidity', false)
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


//draw chart based on the sensor_card clicked

    //capture the sensor name
var sensor_cards = document.querySelectorAll('.sensor-cards')
console.log(sensor_cards[0])
console.log(sensor_cards[1])
// add event listener to each sensor card
function activateSensorCards(){
    for (var i = 0; i < sensor_cards.length; i++) {
        sensor_cards[i].addEventListener('click', function() {
            sensor_name = this.querySelector('.sensor_name').innerHTML
            console.log(sensor_name + ' clicked')
        })
    }
    
      
}

