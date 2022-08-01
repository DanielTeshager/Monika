
t = []
h = []
time = []
fetch('http://127.0.0.1:5000/')
        .then(response => response.json())
        .then(data => {
            t = data["data"]["temp"]
            h = data["data"]["humidity"]
            time = data["data"]["time"]
            
            updateSensorCard()
            drawGraph()
        })
        .catch(error => console.log(error)); 


document.addEventListener('DOMContentLoaded', function() {
    console.log(h, t, time);
   

          // update sensor card
    });

    // update sensor card
    function updateSensorCard() {
        document.querySelector('#hum_value').innerHTML = h[h.length - 1];
        document.querySelector('#temp_value').innerHTML = t[t.length - 1];
    }
    

    //refresh the page
    setInterval(function() {
        fetch('http://127.0.0.1:5000/')
        .then(response => response.json())
        .then(data => {
            t = data["data"]["temp"]
            h = data["data"]["humidity"]
            time = data["data"]["time"]
            
            updateSensorCard()
            drawGraph()
        })
        .catch(error => console.log(error)); 
    }, 5000);


//update divs with data
function updateDivs() {
    document.querySelector('#hum_value').innerHTML = h[h.length - 1];
    document.querySelector('#temp_value').innerHTML = t[t.length - 1];
}

function drawGraph(){
    var chart = bb.generate({
        data: {
          columns: [
         t,
          h
          ],
          type: "line", // for ESM specify as: line()
        },
        bindto: "#lineChart"
      });
      
      setTimeout(function() {
          chart.load({
              columns: [
                t
              ]
          });
      }, 1000);
      
      setTimeout(function() {
          chart.load({
              columns: [
                    h
              ]
          });
      }, 1500);
      
      setTimeout(function() {
          chart.unload({
              ids: "Temperature"
          });
      }, 1000);

}