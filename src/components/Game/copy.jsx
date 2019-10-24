import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';



const styles = {
    root: {
    backgroundColor: green[600],
  },
}

class CorrectSnackBar extends Component {
  handleClose =() => {

    this.props.dispatch({
      type: "CLOSE_INCORRECT_SNACK_BAR"
    });
  };


  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.props.store.incorrectSnackBarReducer}
          autoHideDuration={70000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message"
          }}
          message={<span id='message-id'>TRY AGAIN!</span>}
          className={this.props.classes.root}
          action={[
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              onClick={this.handleClose}>
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(withStyles(styles)(CorrectSnackBar));
