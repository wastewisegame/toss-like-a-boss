//Imports (React, Material-UI, Redux, Router, and components for Organization, Teams, and Contests)
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Settings } from '@material-ui/icons';
import OrganizationName from './SettingsComponents/OrganizationName';
import Teams from './SettingsComponents/Teams';
import Contests from './SettingsComponents/Contests';
import { Redirect } from 'react-router-dom';

//Styles for Material-UI Components
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: 'center',
    background: '#fff',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  cardContent: {
    fontSize: 24
  },
  h1: {
    textAlign: 'right'
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 10,
    marginBottom: -8,
  },
});

class SettingsOrganization extends Component {

  state = {

  }

  render() {

    //Allows for classes when using Material-UI styling.
    const { classes } = this.props

    return (
      <>{this.props.user.wastewise_admin && <Redirect to="/settingsadmin"/> }
      <div className={classes.root}>
        <h1 className={classes.h1}>Settings<Settings className={classes.icon} /></h1>
          <OrganizationName/>
          <br/><br/>
          <Teams/>
        <br /><br />
          <Contests/>
      </div>
      </>
    )

  }

}

const mapStateToProps = (reduxStore) => {
  return {
    user: reduxStore.user,
  }
}
export default connect(mapStateToProps)(withStyles(styles)(SettingsOrganization));