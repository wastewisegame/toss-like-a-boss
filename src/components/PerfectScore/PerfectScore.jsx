import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Header } from 'semantic-ui-react'

const styles = {
    perfectText: {
        textAlign: 'center',
        padding: 10,
        margin: 10,
    },
    perfectTextBody: {
        textAlign: 'center',
        padding: 10,
        margin: 10,
    },
}
class PerfectScore extends Component {
    render() {
        return (
            <div>
                <Header as="h2">CONGRATULATIONS!</Header>
                <Header as="h3">
                    You sorted every item into the correct bin! Play again and
                    see if you can get another perfect score!
                </Header>
            </div>
        )
    }
}

export default withStyles(styles)(PerfectScore)
