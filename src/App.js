import './App.css';
import React from 'react';
import LoginControl from './components/login.js';
import logo from './components/PlanIt.png'
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
import { Button, Icon } from '@mui/material';
import FormDialog from './components/dialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from 'dayjs';



const libraries = ["places"]

const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
}
const center = {lat: 47, lng: 22}
const imgStyle = {height: '8vh', width:'8vh'}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

class App extends React.Component {
  constructor(props) {
      super(props)
      //Methods for altering the state
      this.onSubmitClick = this.logIn.bind(this);
      this.onMapClick = this.addMarker.bind(this);
      this.setSelect = this.setSelected.bind(this);
      this.openDialog1 = this.openDialogWithCoords.bind(this);
      this.openDialog2 = this.openDialogWithoutCoords.bind(this);

      //Vars to determine if maps loaded
      this.loadError = props.loadError
      this.isLoaded = props.isLoaded
      //Reference to child dialog component
      this.childDialog = React.createRef();
      //State
      this.state = {
          loggedIn: "",
          markers: [],
          currentlySelected: null
        };
  }

  logIn(username) {
    this.setState({loggedIn : username})
  }

  addMarker(obj){
    let currMarkers = this.state.markers
    let d = null
    console.log(obj.date)
    obj.date == 0 ? d = dayjs(new Date()).toString() : d = obj.date.toString()
    currMarkers.push({
      lat: obj.lat,
      lng: obj.lng,
      date: d,
      title: obj.title,
      username: this.state.loggedIn
    })
    this.setState({markers : currMarkers})
  }

  setSelected(m){
    console.log(m)
    this.setState({currentlySelected: m})
  }

  openDialogWithoutCoords = (event) => {
    this.childDialog.current.handleClickOpen(-1,-1);
  }

  openDialogWithCoords = (event) => {

    this.childDialog.current.handleClickOpen(event.latLng.lat(), event.latLng.lng());
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

  render() {
    if (this.state.loggedIn != "") {
      if (this.loadError) return "Error Loading";
      //if (!this.isLoaded) return "Loading Maps";
      return (
        <div>
          <h1><img src={logo} alt="Logo" style = {imgStyle} /></h1>
          <Button 
            id = "addplan" 
            onClick = {this.openDialogWithoutCoords}
            color = 'success'
            variant= "contained">
            <AddCircleIcon/> 
          </Button>
          <FormDialog onSubmit = {(obj) => this.addMarker(obj)} ref = {this.childDialog}/>

          <GoogleMap 
          mapContainerStyle={mapContainerStyle}
          zoom = {8}
          center = {center}
          options = {options}
          onClick = {this.openDialogWithCoords}
          >
          {this.state.markers.map(marker => 
          <Marker 
          key = {marker.date} 
          position = {{lat: marker.lat, lng: marker.lng}}
          //icon
          onClick = {() => this.setSelected(marker)}
          />)}

          {this.state.currentlySelected ? (
            <InfoWindow 
            position = {{lat: this.state.currentlySelected.lat, lng: this.state.currentlySelected.lng}}
            onCloseClick = {() => this.setSelected(null)}>
              <div>
                <h2>{this.state.currentlySelected.title}</h2>
                <h3>By: {this.state.currentlySelected.username}</h3>
                <h3>At: {this.state.currentlySelected.date}</h3>
              </div>
            </InfoWindow>
          ) : ""}

          </GoogleMap>
        </div>
      )
    }

    return (
      <div>
        <LoginControl onSubmit = {(username) => this.logIn(username)}/>
      </div>
    );
  }
} 
export default function(props) {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })

  return <App isLoaded = {isLoaded} loadError = {loadError}/>;

}