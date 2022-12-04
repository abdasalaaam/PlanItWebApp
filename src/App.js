import './App.css';
import React from 'react';
import LoginControl from './components/login.js';
import {
  GoogleMap, 
  withScriptjs, 
  withGoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
//import { formatRelative} from "date-fns";
import "@reach/combobox/styles.css";

const libraries = ["places"]

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}

/*function getCurrentLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos)
        return pos
      }
    )
  }
  else {
    return {lat: 47, lng: 22}
  }
}*/

const center = {lat: 47, lng: 22}

function App() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })
  
  const isLoggedIn = ""

  if (isLoggedIn != "") {
    if (loadError) return "Error Loading";
    if (!isLoaded) return "Loading Maps";
  }

  function logIn(username) {
    isLoggedIn = username
  }

  return (
    /*<div>
    <GoogleMap 
    mapContainerStyle={mapContainerStyle}
    zoom = {8}
    center = {center}
    ></GoogleMap>
    </div>*/
    <div>
      <LoginControl onSubmit = {(username) => logIn(username)}/>
    </div>
  );
}

export default App;