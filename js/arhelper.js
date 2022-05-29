var lat, lng;
AFRAME.registerComponent('clickhandler', {
    init: function () {
        this.el.addEventListener('click', () => {
            console.log("clicked");
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                var modal = document.getElementById("myModal");
                modal.style.display = "block";
            });
        });
    }
});

// open modal
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

// create event
function createEvents() {
    var url = "https://eggplant.bunsamosa.org/event.html?lat=" + lat + "&lng=" + lng + "&type=event";
    window.open(url, "_blank");
}

// create location
function createPlace() {
    var url = "https://eggplant.bunsamosa.org/place.html?lat=" + lat + "&lng=" + lng + "&type=place";
    window.open(url, "_blank");
}