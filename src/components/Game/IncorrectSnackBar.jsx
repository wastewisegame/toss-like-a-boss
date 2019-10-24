import React, {Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import amber from "@material-ui/core/colors/green";
import ErrorIcon from "@material-ui/icons/Error";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";

const variantIcon = {
  error: ErrorIcon
};

const styles1 = theme => ({
  error: {
    backgroundColor: "#ff9900",
    minWidth: "fit-content"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  message: {
    fontSize: "1.5rem",
    width: "100%"
  },
  snackBar: {
    width: "100%"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

class IncorrectSnackBar extends Component {


  handleClose = () => {
    this.props.dispatch({
      type: "CLOSE_INCORRECT_SNACK_BAR"
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Snackbar
          className={classes.snackBar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.props.store.incorrectSnackBarReducer}
          autoHideDuration={700}
          onClose={this.handleClose}>
          <MySnackbarContentWrapper
            className={classes.message}
            onClose={this.handleClose}
            variant='error'
            message='TRY AGAIN!'
          />
        </Snackbar>
        {/* <MySnackbarContentWrapper
          variant='success'
          className={classes.margin}
          message='This is a success message!'
        /> */}
      </div>
    );
  }
}

IncorrectSnackBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(withStyles(styles2)(IncorrectSnackBar));
