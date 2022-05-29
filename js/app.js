var marker, circle, lat, long, accuracy, map, osm;

// Location found event handler
function onLocationFound(e) {
    accuracy = e.accuracy;
    lat = e.latlng.lat;
    long = e.latlng.lng;

    marker = L.marker(e.latlng);
    circle = L.circle(e.latlng, accuracy);
    var featureGroup = L.featureGroup([marker, circle]).addTo(map);

    map.fitBounds(featureGroup.getBounds());

    console.log(
        "Your coordinate is: Lat: " +
        lat +
        " Long: " +
        long +
        " Accuracy: " +
        accuracy
    );
}

// Location error event handler
function onLocationError(e) {
    alert(e.message);
}

// Openstreet map
function loadMap() {
    console.log("loading OSM");
    // Initialize map
    map = L.map("map").setView([51.505, -0.09], 13);

    // Initialize osm layer
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);
    console.log("loaded OSM");

    // read balance
    getBalance();
};

// Open AR page
function openAR() {
    window.location.href = "ar.html";
}

// Open maps page
function openMap() {
    window.location.href = "eggsplore.html";
}


// live location fn call
function getPosition(position) {
    // console.log(position)
    lat = position.coords.latitude;
    long = position.coords.longitude;
    accuracy = position.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
    }

    if (circle) {
        map.removeLayer(circle);
    }

    marker = L.marker([lat, long]);
    circle = L.circle([lat, long], { radius: accuracy });

    var featureGroup = L.featureGroup([marker, circle]).addTo(map);

    map.fitBounds(featureGroup.getBounds());

    // set camera position
    if (window.location.pathname == "/ar.html") {
        let camera_element = document.querySelector("a-camera");
        camera_element.setAttribute("gps-camera", `simulateLatitude: ${latitude}; simulateLongitude: ${longitude};`);
    };
    console.log(
        "Your coordinate is: Lat: " +
        lat +
        " Long: " +
        long +
        " Accuracy: " +
        accuracy
    );
}

// set interval for live location update
if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!");
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition);
    }, 5000);
}

// open modal
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// create event
function createEvents() {
    var url = "event.html?lat=" + lat + "&lng=" + long + "&type=event";
    window.open(url, "_blank");
}

// create location
function createPlace() {
    var url = "place.html?lat=" + lat + "&lng=" + long + "&type=place";
    window.open(url, "_blank");
}

// get the form element
const formElement = document.querySelector('form#forms')

// convert the form to JSON
const getFormJSON = (form) => {
    const data = new FormData(form);
    return Array.from(data.keys()).reduce((result, key) => {
        result[key] = data.get(key);
        return result;
    }, {});
};

// handle the form submission event
const handler = (event) => {
    event.preventDefault();
    const valid = formElement.reportValidity();
    if (valid) {
        const result = getFormJSON(formElement);
        console.log(result)
    }
    document.getElementById("forms").reset();
}

formElement.addEventListener("submit", handler)
