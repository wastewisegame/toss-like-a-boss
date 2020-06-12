import React, { Component } from 'react'
import { connect } from 'react-redux'
import wasteWiseLogo from '../../img/WasteWiselogo.jpg'

//Material UI
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
//import Card from '@material-ui/core/Card'
//import CardMedia from '@material-ui/core/CardMedia'

const styles = {
    link: {
        fontSize: 31,
        padding: '30px',
        color: 'black',
        '&:hover': {
            color: 'white',
        },
        backgroundColor: 'green',
        opacity: 0.9,
        borderRadius: '10px',
    },
    p: {
        fontSize: 18,
        padding: '30px',
        color: 'black',
    },
    a: {
        fontSize: 30,
        padding: '30px',
        color: 'black',
    },
    mainDiv: {
        backgroundColor: 'lightGrey',
        opacity: 0.95,
        textAlign: 'center',
    },
    Button: {
        backgroundColor: 'green',
        width: '30%',
        height: '10%',
        fontSize: '1.3em',
        opacity: '1',
        marginTop: '50px',
        marginBottom: '50px',
        '&:hover': {
            backgroundColor: 'darkgreen',
            color: 'white',
        },
        resourcesButton: {
            padding: '4px',
        },
    },
}

class Resources extends Component {
    goToWasteWise = () => {
        window.open(
            'https://www.mnchamber.com/your-opportunity/waste-wise',
            '_blank'
        )
    }

    render() {
        return (
            <Paper className={this.props.classes.mainDiv}>
                <Grid container justify={'center'}>
                    <p className={this.props.classes.a}>
                        {' '}
                        Want to learn more? Visit the MN Waste Wise website
                    </p>
                </Grid>
                <Grid container justify={'center'}>
                    <a
                        href="https://www.mnchamber.com/your-opportunity/waste-wise"
                        target="_blank"
                    >
                        <img
                            src={wasteWiseLogo}
                            alt="Waste Wise logo"
                            height="525px"
                            width="500px"
                        />
                    </a>
                </Grid>
                <Button
                    className={this.props.classes.Button}
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.history.push('/resourcecredits')}
                >
                    Credits
                </Button>
            </Paper>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Resources))
