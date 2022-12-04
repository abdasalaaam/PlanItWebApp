import React from "react"
import Button from '@mui/material/Button';
import {Grid, Paper, Avatar, TextField, Typography, Link} from '@mui/material'
import logo from './planitlogo.png'

class LoginControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleLoginClick = this.handleLogIn.bind(this);
        this.state = {
            loggingIn: false, 
            username: "", 
            password: "",
            uerror: [],
            perror: [],
        };
    }

    handleLogIn = (event) => {
        this.state.loggingIn == true ? this.setState({loggingIn : false}) : this.setState({loggingIn : true})
    }

    handleSubmit = (event) => {
        this.setState({uerror : [], perror: []})
        console.log("gay")
        let uerr = []
        let perr = []
        let unameErrors = this.rules(['empty'], this.state.username)
        for (let i = 0; i < unameErrors.length; i++ ) {
            console.log(unameErrors[i])
            uerr.push(unameErrors[i])
        }
        let pnameErrors = this.rules(['empty'], this.state.password)
        for (let i = 0; i < pnameErrors.length; i++ ) {
            perr.push(pnameErrors[i])
        }
        if (uerr == [] && perr == []) {
            this.props.onSubmit()
            return
        }
        this.setState({uerror : uerr, perror: perr})
    }

    validated = (event) => {
        //communicate with database
        var submit = this.props.onSubmit
        return 
    }

    rules(rules, word) {
        let errors = []
        for (let i = 0; i < rules.length; i++) {
            console.log(rules[i])
            if (rules[i] == 'empty') {
                word.length == 0 ? errors.push("Required!") : console.log("")
            }
            if (rules[i] == 'length') {
                word.length < 2 ? errors.push("Must be longer than 1 char!") : console.log("")
            }
        }
        return errors
    }

    changePassword = (event) => {
        this.setState({password: event.target.value})
    }
    changeUsername = (event) => {
        this.setState({username: event.target.value})
    }

    render() {
        const loggingIn = this.state.loggingIn;
        const uerr = this.state.uerror;
        const perr = this.state.perror;

        const paperStyle = {padding: '4vh', width:280}
        const imgStyle = {height: '21vh', width:'28vh'}

        let title;
        let notification = ""
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

        loggingIn ? title = 'Sign In' : title = 'Sign Up'
        
        return (
            <Grid 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
                <Grid 
                item
                xs={6}
                >
                    <Paper elevation = {10} style = {paperStyle}>
                        <Grid align = 'center' xs = {12} container rowSpacing={'1vh'}>
                            <Grid item xs = {12}>  
                                <img src={logo} alt="Logo" style = {imgStyle} />
                            </Grid>
                            <Grid item xs = {12}>  
                                <h3> {title} </h3>
                            </Grid>
                            <Grid item xs = {12}>  
                                <TextField 
                                label = "Username" 
                                placeholder = "Username"
                                value = {this.state.username}
                                onChange = {this.changeUsername}
                                variant = "standard"
                                id = "uname"
                                fullWidth
                                required/>
                            </Grid>
                            {uerror}
                            <Grid item xs = {12}>  
                                <TextField 
                                label = "Password" 
                                placeholder = "Password"
                                variant = "standard"
                                id = "pword"
                                onChange = {this.changePassword}
                                value = {this.state.password}
                                fullWidth
                                required
                                type = "password"
                                />
                            </Grid>
                            {perror}
                            <Grid xs = {12} item container rowSpacing = {'2vh'}>
                                <Grid item xs = {12}>  
                                    <Button
                                    type = 'Submit'
                                    color = 'primary'
                                    fullWidth
                                    variant= "contained"
                                    onClick = {this.handleSubmit}
                                    value = {this.state.username}
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                                <Grid item xs = {12} rowSpacing = {4} >  
                                    <Typography> Don't have an account? {' '}
                                        <Link href="#" onClick={this.handleLogIn}>
                                            {title}
                                        </Link>
                                    </Typography>
                                </Grid>
                                {notification}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>   
            </Grid>
        )
    }
}

export default LoginControl