import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminGameData extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: "FETCH_GAME_STATISTICS"
        })
    }

    render() {
        return (
            <div>
                <h1>Game Statistics</h1>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}
export default connect(mapStateToProps)(AdminGameData);