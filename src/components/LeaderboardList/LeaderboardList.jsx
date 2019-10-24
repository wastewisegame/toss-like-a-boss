import React, { Component } from "react";

//Material UI components
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

//this is the list from the database of registered / logged in users who have played through the game and are part of the leaderboard. 
class LeaderboardList extends Component {
    render() {
        return (
          <TableRow>
            <TableCell>{this.props.i + 1}</TableCell>
            <TableCell>
              {this.props.player.first_name} {this.props.player.last_name}
            </TableCell>
            <TableCell>{this.props.player.score}</TableCell>
            <TableCell>{this.props.player.time}</TableCell>
            <TableCell>{this.props.player.team_name}</TableCell>
          </TableRow>
        );
    }
}

export default LeaderboardList;