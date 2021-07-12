mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

// Display map navigation controls.
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker({color: 'olivedrab'})
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h6>${campground.name}</h6>${campground.location}<center>$${campground.price}/ Night</center></p>`
            )
    )
    .addTo(map);