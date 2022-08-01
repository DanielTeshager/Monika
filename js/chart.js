
var t = []
var h = []
var time = []
fetch('http://127.0.0.1:5000/')
.then(response => response.json())
.then(data => {
//hide loading
// document.querySelector('.loader').style.display = 'none';
// create a card for each item
    // data.contacts.forEach(item => {
    //     createCard(item);
    // });

    t = data["data"]["temp"]
    h = data["data"]["humidity"]
    time = data["data"]["time"]

   
})
.catch(error => console.log(error));

// print the data
console.log(h);
console.log(t);
// ht = h.unshift('Humidity');
// tt = t.unshift('Temperature');
console.log(time);

document.addEventListener('DOMContentLoaded', function() {
    console.log(h, t, time);
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
    );