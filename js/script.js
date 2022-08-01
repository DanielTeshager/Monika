// init

//add event listener on document ready
document.addEventListener('DOMContentLoaded', function fetchData() {
    //show loading
    // document.querySelector('.loader').style.display = 'block';
    // fetch using cors header
    fetch('http://127.0.0.1:5000/')
        .then(response => response.json())
        .then(data => {
        //hide loading
        // document.querySelector('.loader').style.display = 'none';
        // create a card for each item
            // data.contacts.forEach(item => {
            //     createCard(item);
            // });
            var t = 0
            var h = 0

            for (item in data["data"]){
              h = (data["data"][item]["H"]);
              t = (data["data"][item]["T"]);
              console.log(h, t);
            }
           
        })
        .catch(error => console.log(error));
});

