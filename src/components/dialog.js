import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DatePickerMod from './datepickers';
import {Grid, Typography} from '@mui/material'

export default class FormDialog extends React.Component{
    constructor(props) {
        super(props)
        this.hOpen = this.handleClickOpen.bind(this)
        this.hClose = this.handleClose.bind(this)
        this.cLoc = this.changeLocation.bind(this)
        this.sTime = this.setTime.bind(this)
        this.state = {
            open : false,
            location : "",
            lat : 0,
            lng: 0,
            plantitle : "",
            date: 0,
            terror: [],
            lerror: []
        }
    }

  handleClickOpen = (lat,lng) => {
    if (lat != -1 && lng != -1) {
        this.setState({
            terror: [], 
            lerror: [], 
            open: true, 
            location: '' + lat + ' ' + lng,
            lat: lat,
            lng: lng
        })
    }
    else {
        this.setState({terror: [], lerror: [], open : true, location: ''})
    }
  };

  handleClose = () => {
    this.setState({open:false});
  };

  handleSubmit = (event) => {
    this.setState({terror : [], lerror: []})
    let uerr = []
    let perr = []
    let unameErrors = this.rules(['empty'], this.state.plantitle)
    for (let i = 0; i < unameErrors.length; i++ ) {
        uerr.push(unameErrors[i])
    }
    let pnameErrors = this.rules(['empty'], this.state.location)
    for (let i = 0; i < pnameErrors.length; i++ ) {
        perr.push(pnameErrors[i])
    }

    if (uerr.length == 0 && perr.length == 0) {
        this.props.onSubmit({
            title: this.state.plantitle,
            lat: this.state.lat,
            lng: this.state.lng,
            date: this.state.date
        })
        this.setState({open:false});    
        return
    }
    this.setState({terror : uerr, lerror: perr})

  }

  rules(rules, word) {
    let errors = []
    for (let i = 0; i < rules.length; i++) {
        if (rules[i] == 'empty') {
            word.length == 0 ? errors.push("Required!") : console.log("")
        }
        if (rules[i] == 'length') {
            word.length < 2 ? errors.push("Must be longer than 1 char!") : console.log("")
        }
    }
    return errors
  }

  changeLocation = (event) => {
    this.setState({location: event.target.value})
  }

  changeTitle = (event) => {
    this.setState({plantitle: event.target.value})
  }

  setTime(times) {
    this.setState({date: times})
  }

  render() {
    const uerr = this.state.terror;
    const perr = this.state.lerror;

    let uerror = ""
    let perror = ""

    if (uerr.length > 0) {
        uerror = <Grid item align = 'left' xs = {12}> {uerr.map(item => <Typography style = {{color: "red"}}>{item}</Typography>)}</Grid>
    }
    else {
        uerror = ""
    }

    if (perr.length > 0) {
        perror = <Grid item align = 'left' xs = {12}> {perr.map(item => <Typography style = {{color: "red"}}>{item}</Typography>)}</Grid>
    }
    else {
        perror = ""
    }

    return (
        <div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Create Plan</DialogTitle>
            <DialogContent>
            <Grid container spacing= {2}>
                <Grid item xs = {12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="What?"
                        type="text"
                        fullWidth
                        value = {this.state.plantitle}
                        onChange = {this.changeTitle}

                    />
                </Grid>
                {uerror}
                <Grid item xs = {12}>
                    <DatePickerMod setTimes = {(time) => this.setTime(time)}
                    />  
                </Grid>
                <Grid item xs = {12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Where?"
                        type="text"
                        fullWidth
                        onChange = {this.changeLocation}
                        value = {this.state.location}
                    />
                </Grid>
                {perror}
        </Grid>
        </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleSubmit}>Post!</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
  }
}