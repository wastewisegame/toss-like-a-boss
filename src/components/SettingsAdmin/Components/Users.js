//Imports (React, Material-UI, Redux, SweetAlert)
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Backdrop, Card, CardActions, CardContent, Fab, Grid, Modal, TextField } from "@material-ui/core";
import { Add, Edit, Cancel, Save, Delete, Remove } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//Declaring SweetAlert for use later in this file
const MySwal = withReactContent(Swal)

//Styles for Material-UI Components
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        textAlign: 'center',
        background: '#fff',
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContent: {
        fontSize: 14
    },
    cardContentLeft: {
        fontSize: 20,
        width: 10
    },
    cardContentIcons: {
        fontSize: 20,
        paddingLeft: 5,
        paddingRight: 5
    },
    cardContentUsers: {
        fontSize: 20,
        paddingLeft: 8,
        textAlign: 'center'
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        marginBottom: -8,
    },
    fieldMedium: {
        margin: 5,
        width: 240,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "black"
        }
    },
    fieldLarge: {
        margin: 5,
        width: 490,
        '&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline': {
            borderColor: "black"
        }
    },
    edit: {
        width: "10%"
    },
    delete: {
        width: "10%"
    },
    firstName: {
        width: "20%"
    },
    lastName: {
        width: "20%"
    },
    email: {
        width: "40%"
    },
    addItem: {
        fontSize: 24,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: theme.palette.secondary.main,
        textAlign: 'center'
    },
    input: {
        color: "black"
    },
    cssLabel: {
        '&$cssFocused': {
            color: "black",
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: "black",
        },
    },
    cssFocused: {},
    notchedOutline: { borderColor: "black" }
});

class Users extends Component {

    state = {
        toggleAdd: false,
        userEditOpen: false,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        userId: 0
    }

    //Load users to the DOM
    componentDidMount() {
        this.getUsers();
    }

    //Function to retrieve users from the database
    getUsers() {
        this.props.dispatch({
            type: 'FETCH_WASTE_WISE_USERS'
        })
    }

    //Indicates whether the fields for the add user form should display
    handleAddClick = () => {
        this.setState({
            toggleAdd: !this.state.toggleAdd
        })
    }

    //Saves any changes to form fields to state as users make edits
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value
        });
    }

    //Validation to ensure all required user fields are entered by the user
    addFieldValidation() {

        if (!this.state.firstName) {
            alert('Please enter a value for First Name.')
            return false;
        }
        if (!this.state.lastName) {
            alert('Please enter a value for Last Name.')
            return false;
        }
        if (!this.state.username) {
            alert('Please enter a value for Email Address.')
            return false;
        }
        if (!this.state.password) {
            alert('Please enter a value for Password.')
            return false;
        }
        if (!this.state.confirmPassword) {
            alert('Please enter a value for Confirm Password.')
            return false;
        }
        if (this.state.password.length < 8) {
            alert('Please ensure your password is at least eight characters.');
            return false;
        }
        if (this.state.password !== this.state.confirmPassword) {
            alert('The passwords do not match.  Please try again.');
            return false;
        }

        this.handleUserAdd();
    }

    //Validation to require all fields are filled out when editing a user
    editFieldValidation = (event) => {

        event.preventDefault();

        if (!this.state.firstName) {
            alert('Please enter a value for First Name.')
            return false;
        }
        if (!this.state.lastName) {
            alert('Please enter a value for Last Name.')
            return false;
        }
        if (!this.state.username) {
            alert('Please enter a value for Email Address.')
            return false;
        }
        if (!this.state.password) {
            this.handleEditWithoutPassword();
            return true;
        }
        if (this.state.password.length < 8) {
            alert('Please ensure your password is at least eight characters.');
            return false;
        }
        if (this.state.password !== this.state.confirmPassword) {
            alert('The passwords do not match.  Please try again.');
            return false;
        }

        this.handleEdit();

    }

    //Handles save of a new users and sends a POST request to the database
    handleUserAdd() {
        this.props.dispatch({
            type: 'ADD_WASTE_WISE_USER',
            payload: this.state

        })
        this.setState({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        })
    }

    //Handles delete of a user from the database.  SweetAlert triggers first to verify the selection being made.
    handleDelete = (name, id) => {
        MySwal.fire({
            title: `Delete ${name} as a Waste Wise user?`,
            text: `This will remove ${name} as an administrative user.`,
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_USER',
                    payload: id
                })
                Swal.fire(
                    'Deleted!',
                    `${name} has been removed as a Waste Waste user.`,
                    'success'
                )
            }
        })
    }

    //Handles PUT (edit) request of user and dispatches to the database.
    handleEdit() {
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: this.state
        })
        this.handleUserClose();
    }

    //Ensures user is editing without resetting their password, if no password change was provided during edit process.
    handleEditWithoutPassword() {
        this.props.dispatch({
            type: 'UPDATE_USER_WITHOUT_PASSWORD',
            payload: this.state
        })
        this.handleUserClose();
    }

    //Ensure's a user's information defaults correctly upon edit.
    handleUserEditOpen = (userId, firstName, lastName, username) => {
        this.setState({
            userEditOpen: !this.state.userEditOpen,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: '',
            confirmPassword: '',
            userId: userId
        })
    };

    //Allows user to cancel the edit of a user.
    handleUserClose = () => {
        this.setState({
            userEditOpen: false,
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            userId: 0
        })
    };

    render() {

        //Allows for classes when using Material-UI styling.
        const { classes } = this.props

        //User list variable, containing a loop to display all users in the database to the DOM in a table format.
        let userList = this.props.admin.map(user => {
            return (
                <tr>
                    <td className={classes.cardContentIconsLeft}>
                        <Button onClick={() => this.handleUserEditOpen(user.id, user.first_name, user.last_name, user.username)}>
                            <Edit />
                        </Button>
                    </td>
                    <td className={classes.cardContentIcons}>
                        <Button onClick={() => this.handleDelete(user.first_name, user.id)}>
                            <Delete />
                        </Button>
                    </td>
                    <td className={classes.cardContentItems}>
                        {user.first_name}
                    </td>
                    <td className={classes.cardContentItems}>
                        {user.last_name}
                    </td>
                    <td className={classes.cardContentItems}>
                        {user.username}
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <span className={classes.addItem}>Add Waste Wise Admin User</span>
                <br />
                {!this.state.toggleAdd ? <Fab color="primary" aria-label="add" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                    <Add />
                </Fab> :
                    <Fab color="secondary" aria-label="remove" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                        <Remove />
                    </Fab>
                }
                <br /> <br />
                {this.state.toggleAdd && <div>
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="first name"
                        className={classes.fieldMedium}
                        value={this.state.firstName}
                        onChange={this.handleChangeFor('firstName')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}
                        InputLabelProps={{
                            className: classes.input,
                            shrink: true
                        }}
                    />
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="last name"
                        className={classes.fieldMedium}
                        value={this.state.lastName}
                        onChange={this.handleChangeFor('lastName')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}
                        InputLabelProps={{
                            className: classes.input,
                            shrink: true
                        }}
                    />
                    <br />
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="email address"
                        className={classes.fieldLarge}
                        value={this.state.username}
                        onChange={this.handleChangeFor('username')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}
                        InputLabelProps={{
                            className: classes.input,
                            shrink: true
                        }}
                    />
                    <br />
                    <TextField
                        type="password"
                        align="left"
                        id="outlined-name"
                        label="password"
                        className={classes.fieldMedium}
                        value={this.state.password}
                        onChange={this.handleChangeFor('password')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}
                        InputLabelProps={{
                            className: classes.input,
                            shrink: true
                        }}
                    />
                    <TextField
                        type="password"
                        align="left"
                        id="outlined-name"
                        label="confirm password"
                        className={classes.fieldMedium}
                        value={this.state.confirmPassword}
                        onChange={this.handleChangeFor('confirmPassword')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}
                        InputLabelProps={{
                            className: classes.input,
                            shrink: true
                        }}
                    />
                    <br /><br />
                    <Button className={classes.button} onClick={() => this.addFieldValidation()}
                        variant="contained" name="items" color="primary">Submit User</Button>
                </div>}
                <br /><br />
                <Grid container spacing={4} justify="center">
                    <Grid item sm={2}>
                    </Grid>
                    <Grid item sm={8}>
                        <Card className={classes.card}>
                            <CardActions style={{ backgroundColor: "#EEF1F1" }}>
                                <Grid item sm={5}>
                                </Grid>
                                <Grid item sm={2}>
                                    <span className={classes.cardHeader} style={{ marginLeft: "auto" }}>Users</span>
                                </Grid>
                                <Grid item sm={5} style={{ textAlign: "right" }}>
                                </Grid>
                            </CardActions>
                            <CardContent style={{ backgroundColor: "#EEF1F1" }}>
                                {this.props.item[0] && <table className={classes.tableItem}>
                                    <thead>
                                        <tr>
                                            <th className={classes.edit}>Edit</th>
                                            <th className={classes.delete}>Delete</th>
                                            <th className={classes.firstName}>First Name</th>
                                            <th className={classes.lastName}>Last Name</th>
                                            <th className={classes.email}>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList}
                                    </tbody>
                                </table>}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={2}>
                    </Grid>
                </Grid>

                <Modal
                    aria-labelledby="edit user"
                    aria-describedby="edit user"
                    className={classes.modal}
                    open={this.state.userEditOpen}
                    onClose={this.handleUserClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <CardContent className={classes.form} style={{ backgroundColor: "#EEF1F1" }}>

                        <form onSubmit={this.editFieldValidation}>
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="first name"
                                    className={classes.fieldMedium}
                                    value={this.state.firstName}
                                    onChange={this.handleChangeFor('firstName')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="last name"
                                    className={classes.fieldMedium}
                                    value={this.state.lastName}
                                    onChange={this.handleChangeFor('lastName')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                                <br />
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="email address"
                                    className={classes.fieldLarge}
                                    value={this.state.username}
                                    onChange={this.handleChangeFor('username')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                                <br />
                                <TextField
                                    type="password"
                                    align="left"
                                    id="outlined-name"
                                    label="password"
                                    className={classes.fieldMedium}
                                    value={this.state.password}
                                    onChange={this.handleChangeFor('password')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                                <TextField
                                    type="password"
                                    align="left"
                                    id="outlined-name"
                                    label="confirm password"
                                    className={classes.fieldMedium}
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChangeFor('confirmPassword')}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        className: classes.input,
                                        classes: {
                                            root: classes.cssOutlinedInput,
                                            focused: classes.cssFocused,
                                            notchedOutline: classes.notchedOutline,
                                        }
                                    }}
                                    InputLabelProps={{
                                        className: classes.input,
                                        shrink: true
                                    }}
                                />
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    name="cancel"
                                    color="secondary"
                                    onClick={() => this.handleUserClose()}
                                    style={{ marginTop: 10, marginRight: 10 }}>
                                    <Cancel style={{ marginRight: 3 }} />Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    name="submit"
                                    color="primary"
                                    style={{ marginTop: 10 }}>
                                    <Save style={{ marginRight: 3 }} />Save
                         </Button>
                            </div>
                        </form>

                    </CardContent>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        user: reduxStore.user,
        team: reduxStore.teamSettings,
        organization: reduxStore.orgSettings,
        item: reduxStore.item,
        admin: reduxStore.wasteWiseAdminUsers
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Users));