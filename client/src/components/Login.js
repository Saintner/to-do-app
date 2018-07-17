import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

const styles = {
    container: {
      display: "-webkit-inline-box",
      marginTop: 150,
    },
    card: {
        maxWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Login extends React.Component {

    state={
      userName:"",
      password:"",
      infoEmpty: false,
      errorMessage: ""
    };

    login = (username,password) =>{
        if(username !== "" && password !== ""){
            (async () => {
                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userName: this.state.userName, password: this.state.password})
                }).then(res => res.json()).then(response => {
                    if (response.message === "Wrong"){
                        this.setState({infoEmpty:true,errorMessage:`Username or Password are wrong`});
                    }else{
                        this.props.hasLogged(true);
                        this.props.route.history.push("/");
                    }
                });

            })();
        }else{
            this.setState({infoEmpty:true,errorMessage:`Please fill out Username and Password`});
        }

        /**/
    };

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            Login
                        </Typography>
                        <Typography variant="headline" component="h2">
                            <Input
                                placeholder="Usuario"
                                value={this.state.userName}
                                onChange={event => this.setState({userName:event.target.value})}
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Typography>
                        <br />
                        <Typography component="p">
                            <Input
                                placeholder="Contraseña"
                                value={this.state.password}
                                onChange={event => this.setState({password:event.target.value})}
                                className={classes.input}
                                type="password"
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </Typography>
                        {
                            this.state.infoEmpty &&
                           <div>
                               <br />

                            <Typography component="p">
                                {this.state.errorMessage}
                            </Typography>
                           </div>
                        }

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => this.login(this.state.userName,this.state.password)}>Login</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }


}

export default withStyles(styles)(Login);
