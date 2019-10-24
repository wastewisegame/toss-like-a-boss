import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { connect } from "react-redux";

// importing the components
import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import LoginPage from "../LoginPage/LoginPage";
import GameLaunch from "../GameLaunch/GameLaunch";
import Game from "../Game/Game";
import Resources from "../Resources/Resources";
import Leaderboard from "../LeaderBoardCompany/LeaderBoardCompany";
import ResultsGuestPlayer from "../ResultsGuestPlayer/ResultsGuestPlayer";
import SettingsOrganization from "../SettingsOrganization/SettingsOrganization";
import SettingsAdmin from "../SettingsAdmin/SettingsAdmin";
import RegisterPage from "../RegisterPage/RegisterPage";

//Styling
import { ThemeProvider } from "@material-ui/styles";
import theme from "../Theme/Theme.js";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import "typeface-roboto";
import HowToPlay from "../HowToPlay/HowToPlay";

import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  //protected routes = have to be logged in to see
  //routes = non logged in users are able to see
  //all routes go to a component which is referenced as the component={}
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <Router>
            <div>
              <Nav />
              <Container>
                <Typography color="secondary">
                  <Switch>
                    {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                    <Redirect exact from="/" to="/gamelaunch" />
                    {/* Visiting localhost:3000/about will show the about page. This is a route anyone can see, no login necessary */}
                    <ProtectedRoute exact path="/home" component={SettingsOrganization} />
                    <Route exact path="/results" component={ResultsGuestPlayer} />
                    <Route exact path="/leaderboard" component={Leaderboard} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/gamelaunch" component={GameLaunch} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/howtoplay" component={HowToPlay} />
                    <Route exact path="/resources" component={Resources} />
                    <Route exact path="/register" component={RegisterPage} />
                    <ProtectedRoute exact path="/settingsorg" component={SettingsOrganization} />
                    <AdminRoute exact path="/settingsadmin" component={SettingsAdmin} />
                    <ProtectedRoute exact path="/leaderboard" component={Leaderboard} />
                    {/* If none of the other routes matched, we will show a 404. */}
                    <Route render={() => <h1>404</h1>} />
                  </Switch>
                </Typography>
              </Container>
            </div>
          </Router>
        </ThemeProvider>
      </DndProvider>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};

export default connect(mapStateToProps)(App);
