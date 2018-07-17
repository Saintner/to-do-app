import React, {Component, Fragment} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
    CheckCircle,
} from "@material-ui/icons/index";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = () => ({
    onlineState: {
        marginLeft: "20px",
    },
});

class Navbar extends Component {

    state = {
        drawerOpened: false,
    };

    toggleDrawer = (value) => () => {
        this.setState({
            drawerOpened: value,
        });
    };

    render() {
        const {isLogged} = this.props;

        return (
            <div className="navbar">
                <AppBar position="static">
                    <Toolbar className="toolbar">
                        {isLogged &&
                        <IconButton className="menuButton"
                                    color="inherit"
                                    aria-label="Menu"
                                    onClick={this.toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        }
                        <Typography variant="title"
                                    color="inherit"
                                    className="flex">
                                   To Do App
                        </Typography>
                    </Toolbar>
                </AppBar>
                {isLogged &&
                this.renderDrawer()
                }
            </div>
        )
    }

    renderDrawer() {

        return (
            <Drawer open={this.state.drawerOpened}
                    onClose={this.toggleDrawer(false)}>
                <div tabIndex={0}
                     role="button"
                     onClick={this.toggleDrawer(false)}
                     onKeyDown={this.toggleDrawer(false)}>
                    <div className="lateralDrawer">
                        <List component="nav">
                            <ListItem button
                                      onClick={() => {
                                          this.props.navigateTo("/login");
                                          this.toggleDrawer(false);
                                      }}>
                                <ListItemIcon>
                                    <CheckCircle/>
                                </ListItemIcon>
                                <ListItemText primary="Log Out"/>
                            </ListItem>
                            <Divider/>
                        </List>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default withStyles(styles)(Navbar);
