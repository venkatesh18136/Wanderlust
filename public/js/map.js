const hasCoords = Array.isArray(listing.geometry.coordinates) && listing.geometry.coordinates.length === 2;
const center = hasCoords ? listing.geometry.coordinates : [78.4867, 17.3850]; // fallback

const map = new mapboxgl.Map({
    accessToken: mapToken,
    style:"mapbox://styles/mapbox/streets-v12",
    container: 'map',
    center: center,   // [lng, lat]
    zoom: 9
});

if (hasCoords) {
    new mapboxgl.Marker({ color: "red" })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking.</p>`)
        )
        .addTo(map);
}