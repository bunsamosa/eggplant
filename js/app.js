var marker, circle, lat, long, accuracy, map, osm;

// check if user is logged in
const serverUrl = "https://pjsctz5bkqjc.usemoralis.com:2053/server";
const appId = "TBgozxOyrhwNWSqwPv6bKw0ZDb2PsH52d7GxEHRm";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();
if (!user) {
    window.location.href = "index.html";
}
else {
    console.log("logged in user:", user);
    console.log(user.get("ethAddress"));
}

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

// Moralis Logout
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
    window.location.href = "index.html";
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
    var url = "https://eggplant.bunsamosa.org/event.html?lat=" + lat + "&lng=" + lng + "&type=event";
    window.open(url, "_blank");
}

// create location
function createPlace() {
    var url = "https://eggplant.bunsamosa.org/place.html?lat=" + lat + "&lng=" + lng + "&type=place";
    window.open(url, "_blank");
}
