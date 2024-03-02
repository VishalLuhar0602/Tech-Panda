mapboxgl.accessToken = 'pk.eyJ1IjoiaGl0ZXNoMTAwIiwiYSI6ImNsN2FmODk3MzB0NGQzdm4wN3g0djBxeWEifQ.MwRXE-jIvxzS3Wlzt_tPSg';
const map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/streets-v11', 
  center: [72.6369, 23.2156], // Gandhinagar, India coordinates
  zoom: 12 
});

const marker = new mapboxgl.Marker() 
  .setLngLat([72.6369, 23.2156]) // Gandhinagar, India coordinates
  .addTo(map); 

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl, 
  marker: false, 
  placeholder: 'Search for places in Gandhinagar', // Adjusted placeholder text
  bbox: [72.5755, 23.114, 72.7297, 23.2986], // Bounding box around Gandhinagar
  proximity: {
    longitude: 72.6369, // Gandhinagar, India coordinates
    latitude: 23.2156
  } 
});


map.addControl(geocoder);

map.on('load', () => {
  map.addSource('single-point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': []
    }
  });

  map.addLayer({
    'id': 'point',
    'source': 'single-point',
    'type': 'circle',
    'paint': {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  
  geocoder.on('result', (event) => {
    map.getSource('single-point').setData(event.result.geometry);
  });
});
