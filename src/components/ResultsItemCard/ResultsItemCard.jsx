import React, { Component } from 'react';
import PerfectScore from '../PerfectScore/PerfectScore';
import { connect } from 'react-redux';

//materialUI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = {
    media: {
        width: '100px',
        height: '100px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: 10,
        margin: 'auto'
    },
    card: {
        display: 'inline-block',
        justifyContent: 'space-around',
        maxWidth: 200,
        width: 200,
        height: 350,
        maxHeight: 350,
        margin: 15,
    },
    text: {
        maxWidth: 200,
        height: 100,
        maxHeight: 100,
        padding: 5,
        textAlign: 'center'
    },
    itemHeader: {
        height: 100,
        maxHeight: 100,
        textAlign: 'center'
    },
    cardBody: {
        backgroundColor: '#eef1f1'
    },
    endText: {
        textAlign: 'center',
        padding: 10,
        margin: 10
    }
}

class ResultsItemCard extends Component {
    render() {
        let wrongAnswerArray = [];
        //if there were incorrect answers, map over the array they are 
        //stored in from redux and create cards to display information
        //to user
        //if there are no incorrect answers, render the PerfectScore component
        if (this.props.wrongAnswers && this.props.wrongAnswers[0]) {
            wrongAnswerArray = this.props.wrongAnswers.map(item => {
                return (
                    <div className={this.props.classes.card}>
                        <Card className={this.props.classes.cardBody} >
                            <CardHeader
                                className={this.props.classes.itemHeader}
                                title={item.name}
                            />
                            <CardContent>
                                <CardMedia
                                    className={this.props.classes.media}
                                    image={item.url && item.url}
                                />
                                <Typography variant="body2" className={this.props.classes.text} component="p">
                                    {item.item_text}
                            </Typography>
                            </CardContent>
                        </Card>
                    </div>
                )
            })
        } else {
            return <PerfectScore />
        }
        return (
            <div>
            <div>
                <Typography className={this.props.classes.endText} variant="h6">
                    Congratulations, you did a great job! Here is some more information on the items that were sorted
                    incorrectly. Try again and see if you can get a better score!
                            </Typography>
            </div>
            <div>
                {wrongAnswerArray && wrongAnswerArray}
            </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        wrongAnswers: reduxStore.gameWrongAnswerReducer
    }
}
export default connect(mapStateToProps)(withStyles(styles)(ResultsItemCard));