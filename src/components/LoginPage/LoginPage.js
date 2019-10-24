import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

//Material UI Components
import { Box, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

//styling 
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: 'center',
    background: '#EEF1F1',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: 300,
    '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
      borderColor: "black"
    }
  },
  input: {
    color: "black"
  },

  cssLabel: {
    '&$cssFocused': {
      color: "black",
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: "black",
    },
  },
  cssFocused: {},
  notchedOutline: { borderColor: "black" },
  h1: {
    color: "black"
  }
});

//login page for a user who has registered and now will be able to access the further settings pages of their organization
//if the user is an admin then they will be shown their admin settings.
class LoginPage extends Component {

  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    const { classes } = this.props

    return (

      <body>
        <Box textAlign="center">
          <div style={{ marginTop: 90, padding: 30 }}>
            <Grid container spacing={2} justify="center" style={{ marginTop: 6 }}>
              <Grid item sm={5}>
                <Card style={{ backgroundColor: "#EEF1F1" }}>
                  <CardContent>
                    {this.props.errors.loginMessage && (
                      <h2
                        className="alert"
                        role="alert"
                      >
                        {this.props.errors.loginMessage}
                      </h2>
                    )}
                    <form onSubmit={this.login}>
                      <h1 className={classes.h1}>Toss Like a Boss</h1>
                      <div>
                        <TextField
                          align="left"
                          id="outlined-name"
                          label="email"
                          className={classes.login}
                          value={this.state.username}
                          onChange={this.handleInputChangeFor('username')}
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            className: classes.input,
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            }
                          }}
                          InputLabelProps={{
                            className: classes.input,
                            shrink: true
                          }}
                        />
                      </div>
                      <div>
                        <TextField
                          type="password"
                          align="left"
                          id="outlined-name"
                          label="password"
                          className={classes.login}
                          value={this.state.password}
                          onChange={this.handleInputChangeFor('password')}
                          margin="normal"
                          variant="outlined"
                          InputProps={{
                            className: classes.input,
                            classes: {
                              root: classes.cssOutlinedInput,
                              focused: classes.cssFocused,
                              notchedOutline: classes.notchedOutline,
                            }
                          }}
                          InputLabelProps={{
                            className: classes.input,
                            shrink: true
                          }}
                        />
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <Button variant="contained" color="primary" type="submit" name="submit" value="Login">
                          Login
                      </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Box>
      </body>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(LoginPage)));
