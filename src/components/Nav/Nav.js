import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//Material UI Components
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import './Nav.css'
import { withStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'

// Icons and Logos for the App. Found on the Nav Bar.
import Icon from '@mdi/react'
import { mdiDoorOpen } from '@mdi/js'
import { mdiGamepadSquare } from '@mdi/js'
import { mdiSettingsBox } from '@mdi/js'
import { mdiHelpCircle } from '@mdi/js'
import { mdiAccountPlus } from '@mdi/js'
import { mdiDoorClosedLock } from '@mdi/js'
import { mdiTableLarge } from '@mdi/js'
import mainLogo from '../../img/WasteWiseLogo.png'
// const mainLogo =
//     'https://res.cloudinary.com/wwgamesortcdn/image/upload/v1593786710/kyzri9z9p15coogrnpso.jpg'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

//styling
const styles = (theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: '2%',
    },
})

class Nav extends React.Component {
    state = {
        value: 0,
    }

    componentDidMount() {
        this.handleSetDefaultValue()
    }

    handleChange = (event, value) => {
        this.setState({ value })
    }

    goToGame = () => {
        this.props.history.push('/gamelaunch')
    }
    // conditional rendering the view of the nav bar with the icon tab associated with.
    handleSetDefaultValue() {
        if (window.location.href.includes('home')) {
            this.setState({
                value: 4,
            })
        } else if (window.location.href.includes('login')) {
            this.setState({
                value: 4,
            })
        } else if (window.location.href.includes('settingsorg')) {
            this.setState({
                value: 1,
            })
        } else if (window.location.href.includes('settingsadmin')) {
            this.setState({
                value: 1,
            })
        } else if (window.location.href.includes('game')) {
            this.setState({
                value: 1,
            })
        } else if (window.location.href.includes('resources')) {
            this.setState({
                value: 2,
            })
        } else if (window.location.href.includes('register')) {
            this.setState({
                value: 3,
            })
        } else {
            this.setState({
                value: false,
            })
        }
    }
    // below is the app bar which houses all the navigational choices that a user can see , an admin user can see , and an organization can.
    render() {
        const { classes } = this.props
        const { value } = this.state

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {/* <Tab label="Know What to Throw" /> */}
                        <Typography
                            classes={this.props.classes.nameHeader}
                            component="div"
                        >
                            <Box
                                fontFamily="chunk"
                                fontSize="h6.fontSize"
                                className="gameLogo"
                                textAlign="center"
                                onClick={this.goToGame}
                            >
                                KNOW<br></br> WHAT
                                <br></br>TO THROW
                            </Box>
                        </Typography>
                        {!this.props.user.id && (
                            <Tab
                                label="PLAY"
                                component={Link}
                                to={
                                    this.props.state.currentContestInfo
                                        .access_code
                                        ? `/gamelaunch?contest=${this.props.state.currentContestInfo.access_code}`
                                        : '/gamelaunch'
                                }
                                icon={
                                    <Icon
                                        path={mdiGamepadSquare}
                                        title="Play"
                                        size={2}
                                        horizontal
                                        rotate={360}
                                        color="green"
                                    />
                                }
                            />
                        )}
                        {this.props.user.wastewise_admin && (
                            <Tab
                                label="Settings"
                                component={Link}
                                to="/settingsadmin"
                                icon={
                                    <Icon
                                        path={mdiSettingsBox}
                                        title="Settings"
                                        size={2}
                                        horizontal
                                        rotate={360}
                                        color="green"
                                    />
                                }
                            />
                        )}
                        {this.props.user.wastewise_admin && (
                            <Tab
                                label="Data"
                                component={Link}
                                to="/admingamedata"
                                icon={
                                    <Icon
                                        path={mdiTableLarge}
                                        title="Data"
                                        size={2}
                                        horizontal
                                        rotate={360}
                                        color="green"
                                    />
                                }
                            />
                        )}
                        {this.props.user.id &&
                            !this.props.user.wastewise_admin && (
                                <Tab
                                    label="Settings"
                                    component={Link}
                                    to="/settingsorg"
                                    icon={
                                        <Icon
                                            path={mdiSettingsBox}
                                            title="Settings"
                                            size={2}
                                            horizontal
                                            rotate={360}
                                            color="green"
                                        />
                                    }
                                />
                            )}

                        <Tab
                            label="Resources"
                            component={Link}
                            to="/resources"
                            icon={
                                <Icon
                                    path={mdiHelpCircle}
                                    title="Resources"
                                    size={2}
                                    rotate={360}
                                    color="green"
                                />
                            }
                        />
                        {!this.props.user.id && (
                            <Tab
                                label="REGISTER"
                                component={Link}
                                to="/register"
                                icon={
                                    <Icon
                                        path={mdiAccountPlus}
                                        title="Register"
                                        size={2}
                                        horizontal
                                        rotate={360}
                                        color="green"
                                    />
                                }
                            />
                        )}
                        {this.props.user.id && (
                            <Tab
                                onClick={() =>
                                    this.props.dispatch({ type: 'LOGOUT' })
                                }
                                label="LOGOUT"
                                to="/home"
                                icon={
                                    <Icon
                                        path={mdiDoorClosedLock}
                                        title="Logout"
                                        size={2}
                                        horizontal
                                        rotate={360}
                                        color="green"
                                    />
                                }
                            />
                        )}
                        {!this.props.user.id && (
                            <Tab
                                label="LOGIN"
                                component={Link}
                                to="/home"
                                icon={
                                    <Icon
                                        path={mdiDoorOpen}
                                        title="Login"
                                        size={2}
                                        horizontal
                                        rotate={360}
                                        color="green"
                                    />
                                }
                            />
                        )}
                    </Tabs>
                </AppBar>
            </div>
        )
    }
}

Nav.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    state,
    user: state.user,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Nav)))
