import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
    compostDiv: {
        // backgroundColor: "grey",
        borderRadius: '25px',
        width: 300,
    },
    compostDivHolderDiv: {
        display: 'flex',
        justifyContent: 'center',
    },
    choiceText: {
        textAlign: 'center',
        width: 'auto',
    },
    compostButtons: {
        display: 'flex',
        margin: 'auto',
        width: 'auto',
        padding: 10,
    },
    button: {
        padding: 10,
        width: 300,
        margin: 10,
        borderRadius: 25,
        border: '2px solid black',
    },
}

class CompostBinChoice extends Component {
    noCompostClick = () => {
        this.props.dispatch({
            type: 'COMPOST_BIN',
            payload: false,
        })
        this.props.history.push('/game')
    }
    compostClick = () => {
        this.props.dispatch({
            type: 'COMPOST_BIN',
            payload: true,
        })
        this.props.history.push('/game')
    }
    render() {
        return (
            <div className={this.props.classes.compostDivHolderDiv}>
                <div className={this.props.classes.compostDiv}>
                    {/* <Typography className={this.props.classes.choiceText} variant='h6'>
            Do you have a compost bin? Please select yes or no:
            </Typography> */}
                    <div className={this.props.classes.compostButtons}>
                        <Button
                            className={this.props.classes.button}
                            color="primary"
                            variant="contained"
                            onClick={this.compostClick}
                        >
                            Three Stream
                        </Button>
                        <Button
                            className={this.props.classes.button}
                            color="primary"
                            variant="contained"
                            onClick={this.noCompostClick}
                        >
                            Two Stream
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(withRouter(withStyles(styles)(CompostBinChoice)))
