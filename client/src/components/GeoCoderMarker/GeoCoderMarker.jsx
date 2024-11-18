import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from 'esri-leaflet-geocoder'
let DefaultIcon=L.icon({
    iconUrl:icon,
    shadowUrl:iconShadow
})
L.Marker.prototype.options.icon=DefaultIcon


const GeoCoderMarker = ({address}) => {
    const map=useMap();
    const [position, setPosition]=useState([60,19]);

    
    useEffect(() => {
      if (address) {
          ELG.geocode().text(address).run((err, results) => {
              if (results?.results?.length > 0) {
                  const { lat, lng } = results.results[0].latlng;
                  setPosition([lat, lng]);
                  map.flyTo([lat, lng], 6);
              } else {
                  console.error("Location not found");
              }
          });
      }
  }, [address, map]);
  
  return (
    <Marker position={position} icon={DefaultIcon}>
        <Popup/>
    </Marker>
  )
}

export default GeoCoderMarker

// -------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react'
// import { Marker, Popup, useMap } from 'react-leaflet'
// import L from 'leaflet'
// import "leaflet/dist/leaflet.css"
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import * as ELG from 'esri-leaflet-geocoder';

// // Set default icon
// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const GeoCoderMarker = ({ address }) => {
//   const map = useMap();
//   const [position, setPosition] = useState(null); // Start with null until geocoding is done
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!address) return;

//     // Geocode the address
//     ELG.geocode().text(address).run((err, results) => {
//       if (err) {
//         setError("Geocoding failed");
//         console.error(err);
//         return;
//       }

//       if (results?.results?.length > 0) {
//         const { lat, lng } = results.results[0].latlng;
//         setPosition([lat, lng]);
//         map.flyTo([lat, lng], 6); // Zoom into the new location
//       } else {
//         setError("No results found");
//       }
//     });
//   }, [address, map]);

//   return (
//     <>
//       {position ? (
//         <Marker position={position} icon={DefaultIcon}>
//           <Popup>
//             <span>{address}</span>
//           </Popup>
//         </Marker>
//       ) : (
//         <div>{error || "Loading..."}</div>
//       )}
//     </>
//   );
// }

// export default GeoCoderMarker;
