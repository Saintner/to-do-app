import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateTodo from './CreateTodo';

const styles = {
    container: {
        display: "block",
        marginTop: 150,
        marginLeft: 300
    },
    card: {
        maxWidth: 275,
        marginBottom: 45
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
    createTodoButton:{
        marginBottom: 30,
    }
};

class ToDos extends React.Component {

    state={
        todos: [],
        openCreateTodo: false,
    };

    componentWillMount = () =>{
        fetch('/getTodos')
            .then(res => res.json())
            .then(response => this.setState({todos:response.todos}))
    };

    createTodo = () =>{

    };

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <CreateTodo open={this.state.openCreateTodo}/>
                <Button className={classes.createTodoButton} onClick={() => this.createTodo()}>Create To do</Button>

                {this.state.todos.map(todo => <div>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                {todo.title}
                            </Typography>
                            <Typography variant="headline" component="h2">
                                {todo.description}
                            </Typography>

                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => this.update()}>Update</Button>
                            <Button size="small" onClick={() => this.delete()}>Delete</Button>
                        </CardActions>
                    </Card>
                </div>)}

            </div>
        );
    }


}

export default withStyles(styles)(ToDos);
