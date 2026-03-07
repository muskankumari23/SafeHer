let lat = 0
let lng = 0

const map = L.map('map').setView([0,0],13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map)

navigator.geolocation.watchPosition(pos => {

lat = pos.coords.latitude
lng = pos.coords.longitude

map.setView([lat,lng],15)

L.marker([lat,lng]).addTo(map)

})