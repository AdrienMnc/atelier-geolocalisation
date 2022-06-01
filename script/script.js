//SELECTEURS
const buttonAdd = document.querySelector(".buttonAdd");
const list = document.querySelector(".list");
const buttonSave = document.querySelector(".buttonSave");
const buttonOldSave = document.querySelector(".buttonOldSave");
const buttonRemove = document.querySelector(".buttonRemove");

let latitude;
let longitude;
let accuracy;

// MAP LEAFLET
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

//ECOUTEURS avec FONCTION
// EVENT BOUTON AJOUTER UNE LOCALISATION
buttonAdd.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (position, options) {
    // activer la haute precision sur la map
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    accuracy = position.coords.accuracy;
    let li = document.createElement("li");
    li.innerText = `Latitude ${latitude} - Longitude ${longitude} - Precision ${accuracy}`;
    list.appendChild(li);

    // se deplacer sur la map avec fly to
    map.flyTo([latitude, longitude]);

    // afficher un radius avec la haute precision accuracy
    var circle = L.circle([latitude, longitude], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: accuracy,
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map);
  });
});

// EVENT BOUTTON SAUVEGARDER LA LOCALISATION
buttonSave.addEventListener("click", function () {
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);
});

// EVENT BOUTTON AFFICHER L ANCIENNE LOCALISATION
buttonOldSave.addEventListener("click", function () {
  let latitude = localStorage.getItem("latitude");
  let longitude = localStorage.getItem("longitude");
  let li = document.createElement("li");
  li.innerText = `Ancienne latitude ${latitude} - Ancienne longitude ${longitude}`;
  list.appendChild(li);
});

// BOUTTON POUR EFFACER LES DONNEES DE LOCALISATION
buttonRemove.addEventListener("click", function () {
  localStorage.removeItem("latitude");
  localStorage.removeItem("longitude");
  // boucle remove first child de w3schools avec un while pour tout enlever d'un coup
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
});
