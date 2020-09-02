import React, { Component } from 'react'
import { connect } from 'react-redux'
import CompostBinChoice from '../CompostBinChoice/CompostBinChoice'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Grid, Select } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Help from '@material-ui/icons/Help'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Paper from '@material-ui/core/Paper'
import CompostBinModal from '../CompostBinModal/CompostBinModal'
import Moment from 'react-moment'
import './GameLaunch.css'

const MySwal = withReactContent(Swal)

const styles = {
    HowToPlayButton: {
        backgroundColor: 'green',
        color: 'white',
        border: '2px solid black',
        fontSize: 'calc(15px + 2vmin)',
        padding: '5px',
        borderRadius: 50,
        '&:hover': {
            // change to both KEY and the
            // textDecoration: "underline",
            backgroundColor: '#009E0A',
            color: 'black',
        },
    },
    PlayButton: {
        backgroundColor: 'green',
        color: 'white',
        border: '2px solid black',
        fontSize: 'calc(35px + 2vmin)',
        padding: '10px auto 10px auto',
        // margin: 20,
        width: '50%',
        borderRadius: '200px',
        '&:hover': {
            // change to both KEY and the
            // textDecoration: "underline",
            backgroundColor: '#009E0A',
            color: 'black',
        },
    },
    contestPlayButton: {
        backgroundColor: 'green',
        color: 'white',
        border: '2px solid black',
        fontSize: '20px',
        // padding: "10px 100px 10px 50px",
        margin: '50px',
        width: '75%',
        borderRadius: '20px',
        '&:hover': {
            // change to both KEY and the
            // textDecoration: "underline",
            backgroundColor: '#009E0A',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
        },
    },

    contestPlayButtonDialog: {
        backgroundColor: 'green',
        color: 'white',
        border: '2px solid black',
        fontSize: '20px',
        // padding: "10px 100px 10px 50px",
        margin: '50px',
        width: '75%',
        borderRadius: '20px',
        '&:hover': {
            // change to both KEY and the
            // textDecoration: "underline",
            backgroundColor: '#009E0A',
            color: 'black',
        },
    },

    contestForm: {
        backgroundColor: 'lightgrey',
        borderRadius: '25px',
        margin: '5px',
        maxWidth: '450px',
        display: 'inline-block',
        margin: 'auto',
    },
    formInputs: {
        padding: 5,
        margin: 5,
    },
    teamSelect: {
        width: '200px',
        margin: '10px 0px 0px 0px',
    },
    svgIcon: {
        fontSize: 'calc(15px + 2vmin)',
        paddingRight: '-40px',
    },
    // mainDiv: {
    //     backgroundColor: 'lightGrey',
    // },
    nameHeader: {
        fontFamily: 'chunk',
    },
    playButtonDiv: {
        display: 'flex',
        justifyContent: 'center',
        margin: '5px auto 15px auto',
    },
    contestDiv: {
        justifyContent: 'center',
        display: 'grid',
    },
    contestFormHeader: {
        textAlign: 'center',
    },
    dialogHeader: {
        textAlign: 'center',
    },
}

class GameLaunch extends Component {
    state = {
        timeToPlay: false,
        email: '',
        firstName: '',
        lastName: '',
        contestPlayReady: false,
        team: '',
        team_name: '',
        modalOpen: false,
    }

    componentDidMount() {
        //this will get the id of the contest game from url params
        const contestIdNumber = this.props.history.location.search
            .split('=')
            .pop()
        //if this is a contest game, send dispatch to find whether game has compost or not
        if (this.props.history.location.search) {
            this.props.dispatch({
                type: 'GET_CONTEST_COMPOST_BOOLEAN',
                payload: contestIdNumber,
            })
            this.props.dispatch({
                type: 'GET_COMPANY_ID',
                payload: contestIdNumber,
            })

            this.handleTeamNames()
            this.getContestInfo(contestIdNumber)
            this.setState({ contestPlayReady: true })
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'FETCH_TEAM_ID_NUMBER',
            payload: {
                teamName: this.state.team,
                organizationId: this.props.compostBoolean[0].organization_id,
            },
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentContest !== prevProps.currentContest) {
        }
    }

    getContestInfo(contestId) {
        this.props.dispatch({
            type: 'FETCH_CURRENT_CONTEST_INFO',
            payload: contestId,
        })
    }

    //gets team names from database to populate dropdown
    handleTeamNames = () => {
        const contestIdNumber = this.props.history.location.search
            .split('=')
            .pop()
        this.props.dispatch({
            type: 'GET_TEAM_NAMES',
            payload: contestIdNumber,
        })
    }

    // route the user back to the how to play page
    howToPlay = () => {
        if (this.props.history.location.search) {
            this.props.history.push(
                `/howtoplay${this.props.history.location.search}`
            )
        } else {
            this.props.history.push('/howtoplay')
        }
    }

    // route the user back to the gamelaunch page
    toGame = () => {
        this.setState({
            timeToPlay: true,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.dispatch({
            type: 'SET_SCORE_PERSONAL_INFO',
            payload: this.state,
        })
        //hits reducer to remove compost bin from game if contest has no compost
        if (!this.props.compostBoolean[0].compost) {
            this.props.dispatch({
                type: 'COMPOST_BIN',
                payload: false,
            })
        }
        this.props.history.push(`/game${this.props.history.location.search}`)
    }

    handleChange = (name) => (event) => {
        console.log('handleChange: ', name)
        console.log('event: ', event)
        this.setState({
            [name]: event.target.value,
        })
    }
    handleTeamChange = (name) => (event) => {
        console.log('team Change: ', event)
        this.setState({ team: event.target.value })
        const selectedTeam = this.props.teamNames.find(
            (team) => event.target.value === team.id
        )
        console.log('team selected: ', selectedTeam)
        this.setState({ team_name: selectedTeam.team_name })
    }

    handleOpen = () => {
        this.setState({
            modalOpen: true,
        })
    }

    handleClose = () => {
        this.setState({
            modalOpen: false,
        })
    }

    goToRegister = () => {
        console.log('boop')
        this.props.history.push('/register')
    }

    handleLeaderboardClick = () => {
        let contestIdParam = this.props.history.location.search
        this.props.history.push(`/leaderboard${contestIdParam}`)
    }

    render() {
        const teamNameArray = this.props.teamNames.map((team, index) => {
            console.log('team name array builder: ', team)
            return (
                <MenuItem key={index} value={team.id}>
                    {team.team_name}
                </MenuItem>
            )
        })

        let moment = require('moment')
        let contestStartDate = this.props.currentContest.start_date
        let contestStartTime = this.props.currentContest.start_time
        let contestEndDate = this.props.currentContest.end_date
        let contestEndTime = this.props.currentContest.end_time

        let convertedStartDate = moment(contestStartDate).valueOf()
        let convertedEndDate = moment(contestEndDate).valueOf()
        let convertedStartTime = contestStartTime * 3600000
        let convertedEndTime = contestEndTime * 3600000

        let start = convertedStartDate + convertedStartTime
        let end = convertedEndDate + convertedEndTime
        let current = Date.now()

        let activeContest = false

        if (current > start && current < end) {
            activeContest = true
        }

        return (
            <div className={this.props.classes.mainDiv}>
                {/* <Typography
                    classes={this.props.classes.nameHeader}
                    component="div"
                >
                    <Box
                        fontFamily="chunk"
                        fontSize="h1.fontSize"
                        textAlign="center"
                    >
                        KNOW WHAT TO THROW
                    </Box>
                </Typography> */}
                <div>
                    <Grid item xs={12}>
                        <div className={this.props.classes.playButtonDiv}>
                            <Button
                                className={this.props.classes.HowToPlayButton}
                                onClick={this.howToPlay}
                            >
                                How To Play
                            </Button>
                        </div>
                    </Grid>
                    <Grid
                        container
                        alignItems={'center'}
                        alignContent={'center'}
                        justify="center"
                    >
                        <Grid item xs={12}>
                            <div>
                                {/* <Typography component="div" gutterBottom>
                                    <Box
                                        fontSize="h5.fontSize"
                                        textAlign="center"
                                    >
                                        Welcome to KNOW WHAT TO THROW, the game
                                        that tests your recycling skills
                                    </Box>
                                </Typography> */}
                            </div>
                        </Grid>
                        <div>
                            <Typography component="div" gutterBottom>
                                <Box
                                    fontFamily="Helvetica Neue"
                                    fontSize={20}
                                    textAlign="center"
                                >
                                    Test Your Recycling Skills
                                </Box>
                            </Typography>
                            <Typography component="div" gutterBottom>
                                <Box
                                    fontSize={20}
                                    textAlign="center"
                                    fontFamily="Helvetica Neue"
                                >
                                    If you want to create a contest for your
                                    organization, click{' '}
                                    <a
                                        class="registerLink"
                                        onClick={this.goToRegister}
                                    >
                                        Register
                                    </a>{' '}
                                </Box>
                            </Typography>
                        </div>
                    </Grid>
                </div>
                <div>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Grid item xs={12}>
                            {/* {!this.state.contestPlayReady && (
                                <div
                                    className={this.props.classes.playButtonDiv}
                                >
                                    <Button
                                        className={
                                            this.props.classes.PlayButton
                                        }
                                        onClick={this.toGame}
                                    >
                                        PLAY!
                                    </Button>
                                </div>
                            )} */}
                            {/* conditionally render CompostBinChoice when play is clicked */}

                            {!this.state.contestPlayReady && (
                                <CompostBinChoice />
                            )}
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            {activeContest && (
                                <Button
                                    onClick={this.handleOpen}
                                    className={
                                        this.props.classes.contestPlayButton
                                    }
                                >
                                    <PlayArrow
                                        className={this.props.classes.svgIcon}
                                    />
                                    CONTEST PLAY!{' '}
                                </Button>
                            )}
                        </Grid>
                        <Grid item item xs={6}>
                            {activeContest && (
                                <Button
                                    onClick={this.handleLeaderboardClick}
                                    className={
                                        this.props.classes.contestPlayButton
                                    }
                                >
                                    <PlayArrow
                                        className={this.props.classes.svgIcon}
                                    />
                                    LEADERBOARD{' '}
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    {!activeContest && this.props.history.location.search && (
                        <Card style={{ margin: 5, width: 'auto' }}>
                            <CardContent>
                                <div
                                    style={{
                                        fontSize: 18,
                                        textAlign: 'center',
                                    }}
                                >
                                    The contest you are trying to access has
                                    either expired, or has not yet started.
                                    <br />
                                    <br />
                                    Please feel free to play the game for fun!
                                </div>
                            </CardContent>
                        </Card>
                    )}
                    <div className={this.props.classes.contestDiv}>
                        <Grid item xs={12}></Grid>

                        {this.props.history.location.search && (
                            <Grid item xs={12}>
                                {/* <form
                  className={this.props.classes.contestForm}
                  onSubmit={this.handleSubmit}> */}

                                {/* <div className={this.props.classes.contestFormHeader}> */}
                                <div>
                                    <Dialog
                                        open={this.state.modalOpen}
                                        onClose={this.handleClose}
                                    >
                                        <DialogTitle
                                            className={
                                                this.props.classes.dialogHeader
                                            }
                                        >
                                            You can practice as much as you'd
                                            like before recording your contest
                                            score.
                                            <br />
                                            <a
                                                href="https://www.knowwhattothrow.info/#/gamelaunch"
                                                target="_blank"
                                            >
                                                Click here to practice
                                            </a>
                                        </DialogTitle>

                                        <form
                                            className={
                                                this.props.classes.contestForm
                                            }
                                            onSubmit={this.handleSubmit}
                                        >
                                            <FormControl
                                                className={
                                                    this.props.classes
                                                        .formInputs
                                                }
                                            >
                                                <TextField
                                                    required
                                                    label="Email Address"
                                                    type="email"
                                                    value={this.state.email}
                                                    onChange={this.handleChange(
                                                        'email'
                                                    )}
                                                />
                                                <TextField
                                                    required
                                                    label="First Name"
                                                    value={this.state.firstName}
                                                    onChange={this.handleChange(
                                                        'firstName'
                                                    )}
                                                />
                                                <TextField
                                                    required
                                                    label="Last Name"
                                                    value={this.state.lastName}
                                                    onChange={this.handleChange(
                                                        'lastName'
                                                    )}
                                                />
                                            </FormControl>
                                            {activeContest &&
                                            this.props.teamNames[0] ? (
                                                <FormControl
                                                    required
                                                    className={
                                                        this.props.classes
                                                            .teamSelect
                                                    }
                                                >
                                                    <InputLabel>
                                                        Team Select
                                                    </InputLabel>
                                                    <Select
                                                        required
                                                        label="Team Name"
                                                        value={this.state.team}
                                                        onChange={this.handleTeamChange()}
                                                    >
                                                        <MenuItem
                                                            default
                                                            value="None"
                                                        >
                                                            <em>Select Team</em>
                                                        </MenuItem>
                                                        {/* CONDITIAIONLLY RENDER ARRAY IF THERE ARE TEAM NAMES */}
                                                        {this.props.teamNames &&
                                                            teamNameArray}
                                                    </Select>
                                                </FormControl>
                                            ) : (
                                                <></>
                                            )}
                                            {activeContest && (
                                                <div>
                                                    <Typography component="div">
                                                        <Box
                                                            fontSize="body1.fontSize"
                                                            textAlign="center"
                                                        >
                                                            Click Contest Play
                                                            when you are ready -
                                                            you only get one
                                                            chance to play for a
                                                            score!
                                                        </Box>
                                                    </Typography>
                                                </div>
                                            )}
                                            {activeContest && (
                                                <Button
                                                    type="submit"
                                                    className={
                                                        this.props.classes
                                                            .contestPlayButtonDialog
                                                    }
                                                    // onClick={() => this.props.history.push(`/game${this.props.history.location.search}`)}
                                                >
                                                    <PlayArrow
                                                        className={
                                                            this.props.classes
                                                                .svgIcon
                                                        }
                                                    />
                                                    CONTEST PLAY!{' '}
                                                </Button>
                                            )}
                                        </form>
                                        <DialogActions>
                                            <Button
                                                onClick={this.handleClose}
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                {/* {activeContest && <FormControl className={this.props.classes.formInputs}>
                    <TextField
                      required
                      label='Email Address'
                      type='email'
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                    />
                    <TextField
                      required
                      label='First Name'
                      value={this.state.firstName}
                      onChange={this.handleChange("firstName")}
                    />
                    <TextField
                      required
                      label='Last Name'
                      value={this.state.lastName}
                      onChange={this.handleChange("lastName")}
                    />
                  </FormControl>} */}
                                {/* CONDITIONALLY RENDER TEAM NAME SELECTOR
                  IF THERE ARE TEAM NAMES IN REDUCER */}
                                {/* {activeContest && this.props.teamNames[0] ? (
                    <FormControl
                      required
                      className={this.props.classes.teamSelect}>
                      <InputLabel>Team Select</InputLabel>
                      <Select
                        label='Team Name'
                        value={this.state.teamName}
                        onChange={this.handleChange("teamName")}>
                        <MenuItem default value='None'>
                          <em>Select Team</em>
                        </MenuItem>
                        {/* CONDITIAIONLLY RENDER ARRAY IF THERE ARE TEAM NAMES */}
                                {/* {this.props.teamNames && teamNameArray}
                      </Select>
                    </FormControl>
                  ) : (
                      <></>
                    )} */}
                                {/* {activeContest && <Button
                    type='submit'
                    className={this.props.classes.contestPlayButton}
                  // onClick={() => this.props.history.push(`/game${this.props.history.location.search}`)}
                  >
                    <PlayArrow className={this.props.classes.svgIcon} />
                    CONTEST PLAY!{" "}
                  </Button>}
                </form> */}
                            </Grid>
                        )}
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}

//mapping the state to props
const mapStateToProps = (reduxStore) => {
    return {
        reduxStore,
        compostBoolean: reduxStore.contestCompostBooleanReducer,
        teamNames: reduxStore.organizationTeamNameReducer,
        currentContest: reduxStore.currentContestInfo,
        contestUser: reduxStore.contestUserInfoReducer,
    }
}

// exports the component
export default connect(mapStateToProps)(withStyles(styles)(GameLaunch))
