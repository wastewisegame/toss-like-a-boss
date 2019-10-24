import React, { Component } from "react";
import { connect } from "react-redux";

//Material UI
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = {
  link: {
    fontSize: 31,
    padding: "30px",
    color: "black",
    "&:hover": {
      color: "white"
    },
    backgroundColor: "green",
    opacity: 0.9,
    borderRadius: "10px"
  },
  p: {
    fontSize: 18,
    padding: "30px",
    color: "black"
  },
  a: {
    fontSize: 30,
    padding: "30px",
    color: "black"
  },
  mainDiv: {
    backgroundColor: "lightGrey",
    opacity: 0.95,
    textAlign: "center"
  },
  Button: {
    backgroundColor: "green",
    width: "30%",
    height: "10%",
    fontSize: "1.3em",
    opacity: "1",
    marginBottom: "50px",
    "&:hover": {
      backgroundColor: "darkgreen",
      color: "white"
    }
  }
};

class Resources extends Component {

goToWasteWise = () => {
  window.open("http://www.mnwastewise.org/", "_blank");
}

  render() {
    return (
      <div className={this.props.classes.mainDiv}>
        <Grid container justify={"center"}>
          <p className={this.props.classes.a}> Want to learn more? </p>
        </Grid>
        <Grid container justify={"center"}>
          <p className={this.props.classes.p}>
            Checkout this link bellow for more information on the Minnesota
            Waste Wise website
          </p>
        </Grid>
        <Grid container justify={"center"}>
          <Button
            className={this.props.classes.Button}
            onClick={this.goToWasteWise}>
            Go to WasteWise MN Website
          </Button>
        </Grid>
        <h4>Credit for game icons</h4>
        <div>
          Icons made by{" "}
          <a
            href='https://www.flaticon.com/authors/smashicons'
            title='Smashicons'>
            Smashicons
          </a>{" "}
          from{" "}
          <a href='https://www.flaticon.com/' title='Flaticon'>
            www.flaticon.com
          </a>
        </div>

        <div>
          Icons made by{" "}
          <a href='https://www.flaticon.com/authors/monkik' title='monkik'>
            monkik
          </a>{" "}
          from{" "}
          <a href='https://www.flaticon.com/' title='Flaticon'>
            www.flaticon.com
          </a>
        </div>
        <div>
          Icons made by{" "}
          <a
            href='https://www.flaticon.com/authors/payungkead'
            title='Payungkead'>
            Payungkead
          </a>{" "}
          from{" "}
          <a href='https://www.flaticon.com/' title='Flaticon'>
            www.flaticon.com
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Resources));
