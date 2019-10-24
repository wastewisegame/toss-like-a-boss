import React, {Component} from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";

const variantIcon = {
  success: CheckCircleIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
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
    width: "100%",
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
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={onClose}>
        </IconButton>
      ]}
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

class CorrectSnackBar extends Component {


  handleClose = () => {
    this.props.dispatch({
      type: "CLOSE_CORRECT_SNACK_BAR"
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
          open={this.props.store.correctSnackBarReducer}
          autoHideDuration={700}
          onClose={this.handleClose}>
          <MySnackbarContentWrapper
            className={classes.message}
            onClose={this.handleClose}
            variant='success'
            message='CORRECT!'
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

CorrectSnackBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  store
});

export default connect(mapStateToProps)(withStyles(styles2)(CorrectSnackBar));
