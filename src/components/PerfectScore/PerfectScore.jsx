import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    perfectText: {
        textAlign: 'center',
        padding: 10,
        margin: 10
    }
}
class PerfectScore extends Component {
    render() {
        return (
            <div>
                <Typography className={this.props.classes.perfectText} variant="h4" component="p">
                    CONGRATULATIONS!
                    </Typography>
                <Typography className={this.props.classes.perfectText} variant="body1">
                    You sorted every item into the correct bin! Play again and see if you can get another
                    perfect score!
                    </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(PerfectScore);