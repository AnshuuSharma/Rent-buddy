import React from 'react'
import {MapContainer ,TileLayer} from 'react-leaflet'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker'
const Map = ({address,city,country}) => {
  return (
    <MapContainer 
    center={[53.35,18.8]}
    zoom={1}
    scrollWheelZoom={false}
    style={{
        height:"40vh",
        width:"100%",
        marginTop:"20px",
        zIndex:0,

    }}
    >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        <GeoCoderMarker address={`${address || ''} ${city || ''} ${country || ''}`.trim()} />
    </MapContainer>
  )
}

export default Map
// -----------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker';

// const Map = ({ address, city, country }) => {
//   const [coordinates, setCoordinates] = useState([53.35, 18.8]); // Default to some coordinates
//   const locationQuery = `${address} ${city} ${country}`;

//   // Fetch coordinates using a geocoding API
//   const fetchCoordinates = async (location) => {
//     try {
//       const response = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=YOUR_API_KEY`
//       );
//       const data = await response.json();
//       if (data.results.length > 0) {
//         const { lat, lng } = data.results[0].geometry;
//         setCoordinates([lat, lng]);
//       } else {
//         console.error('Location not found');
//       }
//     } catch (error) {
//       console.error('Error fetching location:', error);
//     }
//   };

//   // Update the map whenever the address, city, or country changes
//   useEffect(() => {
//     if (address && city && country) {
//       fetchCoordinates(locationQuery);
//     }
//   }, [address, city, country]);

//   return (
//     <MapContainer
//       center={coordinates}
//       zoom={13}
//       scrollWheelZoom={false}
//       style={{
//         height: '40vh',
//         width: '100%',
//         marginTop: '20px',
//         zIndex: 0,
//       }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <GeoCoderMarker position={coordinates} />
//     </MapContainer>
//   );
// };

// export default Map;
