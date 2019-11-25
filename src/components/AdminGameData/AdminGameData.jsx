import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class AdminGameData extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_GAME_STATISTICS"
        })
    }

    render() {
        let gameStatsArray = [];
        if (this.props.gameStats) {
            gameStatsArray = this.props.gameStats.map(row => {
                return (
                    <TableRow key={row.id} >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.receptacle}</TableCell>
                        <TableCell>{row.correct_count}</TableCell>
                        <TableCell>{row.number_of_instances} - {row.correct_count}</TableCell>
                        <TableCell>{row.number_of_instances}</TableCell>
                        <TableCell>({row.correct_count} / {row.number_of_instances})*100</TableCell>
                    </TableRow>
                )
            })
        }
        return (
            <div>
                <h1>Game Statistics</h1>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID Number</TableCell>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Receptacle</TableCell>
                                <TableCell>Correct</TableCell>
                                <TableCell>Incorrect</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>%</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gameStatsArray}
                            {/* <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Test Name</TableCell>
                                <TableCell>Receptacle</TableCell>
                                <TableCell>5</TableCell>
                                <TableCell>5</TableCell>
                                <TableCell>10</TableCell>
                                <TableCell>50%</TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        gameStats: reduxStore.adminGameStatistics
    }
}
export default connect(mapStateToProps)(AdminGameData);