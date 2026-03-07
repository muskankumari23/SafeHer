let map;
let marker;
let circle;
let currentLat = null;
let currentLng = null;

function initMap() {
    map = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
}

function updateLocationOnMap(lat, lng) {
    currentLat = lat;
    currentLng = lng;

    if (!marker) {
        marker = L.marker([lat, lng]).addTo(map)
            .bindPopup("You are here")
            .openPopup();

        circle = L.circle([lat, lng], {
            radius: 30
        }).addTo(map);
    } else {
        marker.setLatLng([lat, lng]);
        circle.setLatLng([lat, lng]);
    }

    map.setView([lat, lng], 16);

    const status = document.getElementById("locationStatus");
    if (status) {
        status.textContent = `Live Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }

    // global access for SOS and risk engine
    window.safeHerLocation = {
        lat: lat,
        lng: lng,
        mapLink: `https://maps.google.com/?q=${lat},${lng}`
    };
}

function startLiveTracking() {
    if (!navigator.geolocation) {
        const status = document.getElementById("locationStatus");
        if (status) {
            status.textContent = "Geolocation is not supported in this browser.";
        }
        return;
    }

    navigator.geolocation.watchPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            updateLocationOnMap(lat, lng);
        },
        function (error) {
            const status = document.getElementById("locationStatus");
            if (!status) return;

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    status.textContent = "Location permission denied.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    status.textContent = "Location information unavailable.";
                    break;
                case error.TIMEOUT:
                    status.textContent = "Location request timed out.";
                    break;
                default:
                    status.textContent = "Unable to fetch location.";
            }
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
        }
    );
}

document.addEventListener("DOMContentLoaded", function () {
    initMap();
    startLiveTracking();
});