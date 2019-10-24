import React, { Component } from "react";
import first from "../../img/firstHowToSlide.png";
import second from "../../img/secondHowToSlide.png";
import third from "../../img/thirdHowToSlide.png";
import fourth from "../../img/fourthHowToSlide.png";
import fifth from "../../img/fifthHowToSlide.png";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";

const styles = {
  howToDiv: {
    backgroundColor: "rgb(245,245,245,.5)",
    borderRadius: "25px",
    textAlign: "center"
  },
  header: {
    textAlign: "center"
  },
  button: {
    width: "80%",
    fontSize: "2em",
    backgroundColor: "green",
    marginBottom: "5px"
  }
};

class HowToPlay extends Component {
  state = {
    pageNumber: 1,
    checked: true
  };

//sends player back to home screen
  toHomeScreen = () => {
    if (this.props.history.location.search) {
      this.props.history.push(
        `/gamelaunch${this.props.history.location.search}`
      );
    } else {
      this.props.history.push("/gamelaunch");
    }
  };
//increments page number in state up by one
  nextPage = () => {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    });
  };

  render() {
    return (
      <div>
        {/* First page of how to */}
        {this.state.pageNumber === 1 && (
          <Slide
            direction='right'
            in={this.state.checked}
            mountOnEnter
            unmountOnExit>
            <div className={this.props.classes.howToDiv}>
              <h1 className={this.props.classes.header}>
                1. The game will start with a piece of trash on screen that
                needs to be sorted
              </h1>
              <Button
                className={this.props.classes.button}
                variant='outlined'
                onClick={this.nextPage}>
                Next
              </Button>
              <img src={first} alt='How To Play' height='80%' width='80%' />
              <br />
            </div>
          </Slide>
        )}
        {/* Second page of how to */}
        {this.state.pageNumber === 2 && (
          <Slide
            direction='left'
            in={this.state.checked}
            mountOnEnter
            unmountOnExit>
            <div className={this.props.classes.howToDiv}>
              <h1 className={this.props.classes.header}>
                2. The player must select the correct bin to place the trash
                into
              </h1>
              <Button
                className={this.props.classes.button}
                variant='outlined'
                onClick={this.nextPage}>
                Next
              </Button>
              <img src={second} alt='How To Play' height='80%' width='80%' />
            </div>
          </Slide>
        )}
        {/* Third page of how to */}
        {this.state.pageNumber === 3 && (
          <Slide
            direction='right'
            in={this.state.checked}
            mountOnEnter
            unmountOnExit>
            <div className={this.props.classes.howToDiv}>
              <h1 className={this.props.classes.header}>
                3. If the player is correct a new item will appear on screen.
                There will be fifteen items total
              </h1>
              <Button
                className={this.props.classes.button}
                variant='outlined'
                onClick={this.nextPage}>
                Next
              </Button>
              <img src={third} alt='How To Play' height='80%' width='80%' />
            </div>
          </Slide>
        )}
        {/* Fourth page of how to */}
        {this.state.pageNumber === 4 && (
          <Slide
            direction='left'
            in={this.state.checked}
            mountOnEnter
            unmountOnExit>
            <div className={this.props.classes.howToDiv}>
              <h1 className={this.props.classes.header}>
                4. If the player places an item in the wrong bin, they must
                place it in the correct bin to move on.
              </h1>
              <Button
                className={this.props.classes.button}
                variant='outlined'
                onClick={this.nextPage}>
                Next
              </Button>
              <img src={fifth} alt='How To Play' height='80%' width='80%' />
            </div>
          </Slide>
        )}
        {/* Fifth page of how to */}
        {this.state.pageNumber === 5 && (
          <Slide
            direction='right'
            in={this.state.checked}
            mountOnEnter
            unmountOnExit>
            <div className={this.props.classes.howToDiv}>
              <h1 className={this.props.classes.header}>
                5. Points are only awarded if the player gets it right on the
                first try.
              </h1>
              <Button
                className={this.props.classes.button}
                variant='outlined'
                onClick={this.toHomeScreen}>
                Back to Home Screen
              </Button>
              <img src={fifth} alt='How To Play' height='80%' width='80%' />
            </div>
          </Slide>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxStore => {
  return {
    reduxStore
  };
};
export default connect(mapStateToProps)(withStyles(styles)(HowToPlay));
