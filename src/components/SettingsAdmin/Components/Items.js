//Imports (React, Material-UI, Redux, SweetAlert)
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Backdrop, Card, CardActions, CardContent, Fab, Grid, MenuItem, Modal, TextField } from "@material-ui/core";
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
    cardContentItems: {
        fontSize: 20,
        paddingLeft: 8,
        textAlign: 'center'
    },
    image: {
        height: 100,
        width: 100
    },
    imageModal: {
        height: "20%",
        width: "20%",
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
    addItem: {
        fontSize: 24,
    },
    edit: {
        width: "10%"
    },
    delete: {
        width: "10%"
    },
    itemName: {
        width: "40%"
    },
    receptacle: {
        width: "20%"
    },
    upload: {
        marginLeft: 10
    },
    pleaseWait: {
        color: "red",
        fontWeight: "bold"
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

class Items extends Component {

    state = {
        toggleAdd: false,
        itemName: '',
        receptacle: '',
        url: '',
        itemText: '',
        itemId: 0,
        selectedFile: null,
        attachment_url: '',
        file: null,
        pleaseWait: false
    }

    //Load items to the DOM
    componentDidMount() {
        this.getItems();
    }

    //When an image is detected in props, load these images
    componentDidUpdate(prevProps) {
        if (this.props.image !== prevProps.image) {
            this.setState({
                url: this.props.image,
                pleaseWait: false
            })
        }
    }

    //Function to get the items, included in componentDidMount
    getItems() {
        this.props.dispatch({
            type: 'FETCH_ITEMS'
        })
    }
    
    //Toggles display of form for a new item
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

    //Initializes item fields with its saved values upon edit
    handleItemEditOpen = (name, receptacle, text, url, id) => {
        this.setState({
            itemEditOpen: !this.state.itemEditOpen,
            itemName: name,
            receptacle: receptacle,
            itemText: text,
            url: url,
            itemId: id
        })
    };

    //Posts a new item to the database
    handleItemAdd = () => {
        this.props.dispatch({
            type: 'ADD_ITEM',
            payload: this.state

        })
        this.setState({
            itemName: '',
            receptacle: '',
            url: '',
            itemText: '',
            file: ''
        })
    }

    //Deletes an item from the database.  Uses a SweetAlert, so user must confirm the change.
    handleDelete = (name, id) => {
        MySwal.fire({
            title: `Delete the ${name} item?`,
            text: `This will remove ${name} from the game.`,
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                this.props.dispatch({
                    type: 'DELETE_ITEM',
                    payload: id
                })
                Swal.fire(
                    'Deleted!',
                    `The item ${name} has been deleted.`,
                    'success'
                )
            }
        })
    }

    //Grabs the image file information upon selecting an image file
    handleUploadInputChange = e => {
        this.setState({ file: e.target.files[0] });
    };

    //Posts the image to Amazon Web Services S3 storage and retrieves the image URL.
    handleUpload = event => {
        event.preventDefault();

         this.props.dispatch({
            type: 'ADD_ITEM_IMAGE',
            payload: this.state
        });

        this.setState({
            pleaseWait: !this.state.pleaseWait
        })
    };

    //Handes PUT request to change then information about an item.
    handleEdit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_ITEM',
            payload: this.state
        })
        this.handleItemClose();
    }

    //Allows a user to cancel an item change.
    handleItemClose = () => {
        this.setState({
            itemEditOpen: false,
            itemName: '',
            itemReceptacle: '',
            itemUrl: '',
            itemText: '',
        })
    };

    render() {

        //Allows for classes when using Material-UI styling.
        const { classes } = this.props

        //Item list variable, containing a loop to display all items in the database to the DOM in a table format.
        let itemList = this.props.item.map(item => {
            return (
                <tr>
                    <td className={classes.cardContentIconsLeft}>
                        <Button onClick={() => this.handleItemEditOpen(item.name, item.receptacle, item.item_text, item.url, item.id)}>
                            <Edit />
                        </Button>
                    </td>
                    <td className={classes.cardContentIcons}>
                        <Button onClick={() => this.handleDelete(item.name, item.id)}>
                            <Delete />
                        </Button>
                    </td>
                    <td className={classes.cardContentItems}>
                        {item.name}
                    </td>
                    <td className={classes.cardContentItems}>
                        {item.receptacle}
                    </td>
                    <td className={classes.cardContentItems}>
                        <img className={classes.image} src={item.url} />
                    </td>
                </tr>
            )
        })

        return (

            <div>
                <span className={classes.addItem}>Add Item</span>
                <br />
                {!this.state.toggleAdd ? <Fab color="primary" aria-label="add" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                    <Add />
                </Fab> :
                    <Fab color="secondary" aria-label="remove" style={{ marginTop: 15 }} onClick={this.handleAddClick}>
                        <Remove />
                    </Fab>
                }
                <br /><br />
                {this.state.toggleAdd && <div>
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="item name"
                        className={classes.fieldMedium}
                        value={this.state.itemName}
                        onChange={this.handleChangeFor('itemName')}
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
                        select
                        label="receptacle"
                        className={classes.fieldMedium}
                        value={this.state.receptacle}
                        onChange={this.handleChangeFor('receptacle')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.status,
                            },
                        }}
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
                    >
                        <MenuItem value="garbage">
                            Garbage
                        </MenuItem>
                        <MenuItem value="recycle">
                            Recycling
                        </MenuItem>
                        <MenuItem value="compost">
                            Compost
                        </MenuItem>
                    </TextField>
                    <br />
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="reason for receptacle"
                        className={classes.fieldLarge}
                        value={this.state.itemText}
                        onChange={this.handleChangeFor('itemText')}
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
                    <br/><br/>
                    <TextField
                        type='file'
                        onChange={this.handleUploadInputChange}
                        />
                    <Button className={classes.upload} variant='contained' color='secondary' onClick={this.handleUpload}>
                        Upload
					</Button>
                    {this.state.pleaseWait && <br/>}
                    {this.state.pleaseWait && <span className={classes.pleaseWait}>Please wait...</span>}
                    <br/><br/>
                    <TextField
                        align="left"
                        id="outlined-name"
                        label="image url"
                        className={classes.fieldLarge}
                        value={this.state.url}
                        onChange={this.handleChangeFor('url')}
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
                    {/* <ImageUpload/> */}
                    <br /><br />
                    <Button className={classes.button} onClick={() => this.handleItemAdd()}
                        variant="contained" name="items" color="primary">Submit Item</Button>
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
                                    <span className={classes.cardHeader} style={{ marginLeft: "auto" }}>Items</span>
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
                                            <th className={classes.itemName}>Item Name</th>
                                            <th className={classes.receptacle}>Receptacle</th>
                                            <th className={classes.image}>Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemList}
                                    </tbody>
                                </table>}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={2}>
                    </Grid>
                </Grid>

                <Modal
                    aria-labelledby="edit item"
                    aria-describedby="edit item"
                    className={classes.modal}
                    open={this.state.itemEditOpen}
                    onClose={this.handleContestClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <CardContent className={classes.form} style={{ backgroundColor: "#EEF1F1" }}>

                        {/* <h1 className={classes.h1} style={{ color: this.props.user.color }}>Enter Contest Details</h1> */}
                        <form onSubmit={this.handleEdit}>
                            <div>
                                <img className={classes.imageModal} src={this.state.url}/>
                                <br/><br/>
                            </div>
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="item name"
                                    className={classes.fieldMedium}
                                    value={this.state.itemName}
                                    onChange={this.handleChangeFor('itemName')}
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
                                    select
                                    label="receptacle"
                                    className={classes.fieldMedium}
                                    value={this.state.receptacle}
                                    onChange={this.handleChangeFor('receptacle')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.status,
                                        },
                                    }}
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
                                >
                                    <MenuItem value="garbage">
                                        Garbage
                                    </MenuItem>
                                    <MenuItem value="recycle">
                                        Recycling
                                    </MenuItem>
                                    <MenuItem value="compost">
                                        Compost
                                    </MenuItem>
                                </TextField>
                            </div>
                            <div>
                                <TextField
                                    align="left"
                                    id="outlined-name"
                                    label="reason for receptacle"
                                    className={classes.fieldLarge}
                                    value={this.state.itemText}
                                    onChange={this.handleChangeFor('itemText')}
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
                                    onClick={() => this.handleItemClose()}
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
        image: reduxStore.imageUrlReducer
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Items));