// handle show hide of overlay
var overlay = document.querySelector('.overlay');
var close = document.querySelector('.btn-close');
var sensorCard = document.querySelector('.sensor-card');

// handle close button
close.addEventListener('click', function() {
    overlay.style.display = 'none';
});


// handle show hide of overlay
sensorCard.addEventListener('click', function() {
    overlay.style.display = 'block';
});
