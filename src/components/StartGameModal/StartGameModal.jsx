import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        opacity: .9
    },
    modalHeader: {
        border: '3px solid black',
        backgroundColor: 'green',
        width: 500,
        height: 300,
        textAlign: 'center',
        opacity: 1,
        borderRadius: 50,
        fontWeight: 800,
        margin: 'auto',
        justifyContent: 'center',
        display: 'flex'
    },
    dialogText: {
        fontWeight: 800,
        margin: 'auto',
        textAlign: 'center',
        fontSize: 70,
        color: 'black'
    },
    dialogBox: {
        height: 400,
        width: 400
    }
}

class StartGameModal extends Component {

    state = {
        open: true,
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.handleTimerStart()
    };

    render() {
        return (
            // <div
            //     onClick={this.props.handleTimerStart}
            //     className={this.props.classes.modal}>
            //     <Modal

            //         className={this.props.classes.modal}
            //         aria-labelledby="simple-modal-title"
            //         aria-describedby="simple-modal-description"
            //         open={this.state.open}
            //         onClose={this.handleClose}
            //     >
            //         <div>
            //             <Typography className={this.props.classes.modalHeader} variant="h1" id="modal-title">
            //                 START GAME
            // </Typography>
            //             {/* <Typography variant="subtitle1" id="simple-modal-description">
            //                 Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            // </Typography> */}
            //             {/* <SimpleModalWrapped /> */}
            //         </div>
            //     </Modal>
            // </div>
            <div
                onClick={this.handleClose}>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    // onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div className={this.props.classes.dialogBox}>
                        <DialogContent>
                            <DialogContentText
                                className={this.props.classes.dialogText}
                                id="alert-dialog-slide-description">
                                CLICK TO START GAME
            </DialogContentText>
                        </DialogContent>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(StartGameModal);