import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink, CSVDownload } from 'react-csv';



class AdminGameDataTable extends Component {

    render() {
        const data = this.props.gameStats;
        // const data = JSON.stringify(stats);

        return (
            <div>
                <CSVLink data={data}>Download</CSVLink>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        gameStats: reduxStore.adminGameStatistics
    }
}

export default connect(mapStateToProps)(AdminGameDataTable);