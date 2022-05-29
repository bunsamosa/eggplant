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
};


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
