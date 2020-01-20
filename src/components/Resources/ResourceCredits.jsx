import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    resources:{
        padding: '5px'
    }
}

class ResourceCredits extends Component {
  render() {
    return (
      <div>
        <Paper className={this.props.classes.resources}>
          <h4>Credit for game icons</h4>
          <div>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/smashicons"
              title="Smashicons"
            >
              Smashicons
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>

          <div>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/monkik" title="monkik">
              monkik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
          <div>
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/payungkead"
              title="Payungkead"
            >
              Payungkead
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ResourceCredits);
