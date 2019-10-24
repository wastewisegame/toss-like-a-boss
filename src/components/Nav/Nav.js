import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Material UI Components
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "./Nav.css";
import { withStyles } from "@material-ui/styles";

// Icons and Logos for the App. Found on the Nav Bar. 
import mainlogo from "../../img/mainlogo.png";
import Icon from "@mdi/react";
import { mdiDoorOpen } from "@mdi/js";
import { mdiGamepadSquare } from "@mdi/js";
import { mdiSettingsBox } from "@mdi/js";
import { mdiHelpCircle } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";
import { mdiDoorClosedLock } from "@mdi/js";


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

//styling
const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class Nav extends React.Component {
  state = {
    value: 0
  };
  
  componentDidMount() {
    this.handleSetDefaultValue();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
// conditional rendering the view of the nav bar with the icon tab associated with.
  handleSetDefaultValue() {
    if (window.location.href.includes("home")) {
      this.setState({
        value: 4
      });
    } else if (window.location.href.includes("login")) {
      this.setState({
        value: 4
      });
      } else if (window.location.href.includes("settingsorg")) {
      this.setState({
        value: 1
      });
    } else if (window.location.href.includes("settingsadmin")) {
      this.setState({
        value: 1
      });
      } else if (window.location.href.includes("game")) {
      this.setState({
        value: 1
      });
    } else if (window.location.href.includes("resources")) {
      this.setState({
        value: 2
      });
      } else if (window.location.href.includes("register")) {
      this.setState({
        value: 3
      });
    } else {
      this.setState({
        value: false
      });
    }
  }
// below is the app bar which houses all the navigational choices that a user can see , an admin user can see , and an organization can. 
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="#EEF1F1">
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            {/* <Tab label="Toss Like A Boss" /> */}
            <img src={mainlogo} style={{width: 149, height: 100}}/>
            {/* /Users/maxmaher/Documents/prime/tier3/GROUP-PROJECT/waste-wise-game/src/components/Nav/NavGuest.js */}
            /Users/maxmaher/Documents/prime/tier3/GROUP-PROJECT/waste-wise-game/src/img/mainlogo.png
            {/* <span>Toss Like A Boss</span> */}
            {!this.props.user.id && (
              <Tab
                label="PLAY"
                component={Link}
                to="/gamelaunch"
                icon={
                  <Icon
                    path={mdiGamepadSquare}
                    title="Play"
                    size={2}
                    horizontal
                    rotate={360}
                    color="green"
                  />
                }
              />
            )}
            {this.props.user.wastewise_admin && (
              <Tab
                label="Settings"
                component={Link}
                to="/settingsadmin"
                icon={
                  <Icon
                    path={mdiSettingsBox}
                    title="Settings"
                    size={2}
                    horizontal
                    rotate={360}
                    color="green"
                  />
                }
              />
            )}
            {this.props.user.id && !this.props.user.wastewise_admin && (
              <Tab
                label="Settings"
                component={Link}
                to="/settingsorg"
                icon={
                  <Icon
                    path={mdiSettingsBox}
                    title="Settings"
                    size={2}
                    horizontal
                    rotate={360}
                    color="green"
                  />
                }
              />
            )}
            
            <Tab
              label="Resources"
              component={Link}
              to="/resources"
              icon={
                <Icon
                  path={mdiHelpCircle}
                  title="Resources"
                  size={2}
                  rotate={360}
                  color="green"
                />
              }
            />
            {!this.props.user.id && (
              <Tab
                label="REGISTER"
                component={Link}
                to="/register"
                icon={
                  <Icon
                    path={mdiAccountPlus}
                    title="Register"
                    size={2}
                    horizontal
                    rotate={360}
                    color="green"
                  />
                }
              />
            )}
            {this.props.user.id && (
              <Tab
                onClick={() => this.props.dispatch({ type: "LOGOUT" })}
                label="LOGOUT"
                to="/home"
                icon={
                  <Icon
                    path={mdiDoorClosedLock}
                    title="Logout"
                    size={2}
                    horizontal
                    rotate={360}
                    color="green"
                  />
                }
              />
            )}
            {!this.props.user.id && (
              <Tab
                label="LOGIN"
                component={Link}
                to="/home"
                icon={
                  <Icon
                    path={mdiDoorOpen}
                    title="Login"
                    size={2}
                    horizontal
                    rotate={360}
                    color="green"
                  />
                }
              />
            )}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};


// // Instead of taking everything from state, we just want the user
// // object to determine if they are logged in
// // if they are logged in, we show them a few more links
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  state,
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Nav));
