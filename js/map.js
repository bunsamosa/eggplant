var map;

// Location found event handler
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

// Location error event handler
function onLocationError(e) {
    alert(e.message);
}

// Openstreet map
function loadMap() {
    console.log("loading OSM");
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);
    console.log("loaded OSM");
};
