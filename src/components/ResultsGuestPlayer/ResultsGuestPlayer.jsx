import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import ResultsItemCard from '../ResultsItemCard/ResultsItemCard'

const styles = {
    media: {
        width: '100px',
        height: '100px',
    },
    background: {
        backgroundImage: 'url(/images/River.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 900,
        padding: 24,
    },
    scoreText: {
        padding: 10,
        margin: 10,
    },
    playAgainButton: {
        display: 'flex',
        justifyContent: 'center',
    },
    resultsDiv: {
        backgroundColor: 'lightgrey',
        // opacity: 0.8,
        fontFamily: 'Helvetica Neue',
    },
    leaderboardButton: {
        display: 'flex',
        margin: 'auto',
    },
    leaderboardview: {
        textAlign: 'center',
        marginBottom: 10,
    },
    playAgain: {
        marginBottom: '30px',
    },
}

class ResultsGuestPlayer extends Component {
    state = {
        numberOfGameItemsUsed: this.props.reduxStore.gameItemsReducer.length,
    }
    componentWillUnmount() {
        this.props.history.location.search && this.sendContestGameData()
        this.props.dispatch({
            type: 'RESET_CURRENT_GAME_VALUE',
        })
        this.props.dispatch({
            type: 'RESET_GAME_TIME',
        })
        this.props.dispatch({
            type: 'RESET_GAME_SCORE',
        })
        this.props.dispatch({
            type: 'CLEAR_WRONG_ANSWERS',
        })
    }

    sendContestGameData = () => {
        this.props.dispatch({
            type: 'SEND_CONTEST_GAME_DATA',
            payload: {
                firstName: this.props.contestUserInfo.firstName,
                lastName: this.props.contestUserInfo.lastName,
                email: this.props.contestUserInfo.email,
                score: this.props.gameScore,
                time: this.props.gameTime,
                contestIdNumber: this.props.reduxStore.currentContestInfo.id,
                organizationIdNumber: this.props.reduxStore.currentContestInfo
                    .organization_id,
                teamIdNumber: this.props.teamIdNumber,
            },
        })
    }

    playAgain = () => {
        //if they are a contest player with search params, push to gamelaunch with those params
        //or push to regular gamelaunch page if not
        // if (this.props.history.location.search) {
        //     this.props.history.push(
        //         `/gamelaunch${this.props.history.location.search}`
        //     )
        // } else {
        this.props.dispatch({
            type: 'CURRENT_CONTEST_USER_PLAYED_AGAIN',
        })

        this.props.history.push('/gamelaunch')
        // }
    }

    handleLeaderboardClick = () => {
        const payloadObject = this.props.history.location.search
            .split('=')
            .pop()
        this.props.dispatch({
            type: 'FETCH_LEADERBOARD',
            payload: payloadObject,
        })
        this.props.history.push(
            `/leaderboard${this.props.history.location.search}`
        )
    }

    render() {
        const scorePercentage = parseInt((this.props.gameScore / 15) * 100)
        return (
            <div>
                <div className={this.props.classes.resultsDiv}>
                    <div>
                        <Grid
                            container
                            justify={'space-evenly'}
                            spacing={24}
                            alignItems={'center'}
                        >
                            <div>
                                <h1 className={this.props.classes.scoreText}>
                                    SCORE:{' '}
                                    {this.props.gameWrongAnswers.length ===
                                    undefined
                                        ? this.state.numberOfGameItemsUsed
                                        : this.state.numberOfGameItemsUsed -
                                          this.props.gameWrongAnswers.length +
                                          '/' +
                                          this.state.numberOfGameItemsUsed}{' '}
                                    -{' '}
                                    {parseInt(
                                        ((15 -
                                            this.props.gameWrongAnswers
                                                .length) /
                                            15) *
                                            100
                                    )}
                                    %
                                </h1>
                            </div>
                            <div>
                                <h1
                                    className={this.props.classes.scoreText}
                                    // variant="h3"
                                >
                                    TIME: {this.props.gameTime} sec
                                </h1>
                            </div>
                        </Grid>
                    </div>
                    <div>
                        {this.props.history.location.search && (
                            <div>
                                <h2
                                    fontFamily="Helvetica "
                                    className={
                                        this.props.classes.leaderboardview
                                    }
                                    // variant="h5"
                                >
                                    VIEW THE CONTEST LEADERBOARD
                                </h2>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={
                                        this.props.classes.leaderboardButton
                                    }
                                    onClick={() =>
                                        this.handleLeaderboardClick()
                                    }
                                >
                                    CONTEST LEADERBOARD
                                </Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <ResultsItemCard />
                    </div>

                    <div className={this.props.classes.playAgainButton}>
                        <Button
                            className={this.props.classes.playAgain}
                            onClick={() => this.playAgain()}
                            variant="contained"
                            color="primary"
                        >
                            CLICK HERE TO PLAY AGAIN
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    console.log('MAP STATE TO PROPS: ', reduxStore)
    return {
        gameScore: reduxStore.gameScoreReducer,
        gameWrongAnswers: reduxStore.gameWrongAnswerReducer,
        gameTime: reduxStore.gameTimeReducer,
        contestUserInfo: reduxStore.contestUserInfoReducer,
        organizationInfo: reduxStore.organizationTeamNameReducer,
        contestInfo: reduxStore.contestCompostBooleanReducer,
        teamIdNumber: reduxStore.contestUserInfoReducer.team
            ? reduxStore.contestUserInfoReducer.team
            : null,
        reduxStore,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ResultsGuestPlayer))
