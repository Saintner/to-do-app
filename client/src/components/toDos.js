import React from 'react';
import {withStyles} from '@material-ui/core/styles';
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
    createTodoButton: {
        marginBottom: 30,
    }
};

class ToDos extends React.Component {

    state = {
        todos: [],
        openCreateTodo: false,
        sendButtonTitle: "Create",
        refresh: false,
        selectedTodo: {
            title: "",
            description: "",
            index: "none"
        },
    };

    componentWillMount = () => {
        fetch('/getTodos')
            .then(res => res.json())
            .then(response => this.setState({todos: response.todos}))
    };

    createTodo = (title, index = "none") => {
        let selectedTodo = index !== "none" ? {
            title: this.state.todos[index].title,
            description: this.state.todos[index].description,
            index: index
        } : {title: "", description: "", index: index};
        this.setState({openCreateTodo: true, sendButtonTitle: title, selectedTodo: selectedTodo})
    };

    deleteTodo = (index) => {
        fetch(`/deleteTodo/${index}`)
            .then(res => res.json())
            .then(deletedResponse => {
                fetch('/getTodos')
                    .then(res => res.json())
                    .then(response => this.setState({todos: response.todos}))
            })
    };

    handleDialogCreateTodoClose = () => {
        this.setState({openCreateTodo: false});
    };

    handleCloseDialogAndRefresh = () => {
        this.handleDialogCreateTodoClose();
        fetch('/getTodos')
            .then(res => res.json())
            .then(response => this.setState({todos: response.todos}))
    };

    onDialogTextFormChange = (text,value) =>{
        if (text === "title") {
            this.setState({selectedTodo:{
                    title: value,
                    description: this.state.selectedTodo.description,
                    index: this.state.selectedTodo.index
                }})
        }else if (text === "description") {
            this.setState({selectedTodo:{
                    title: this.state.selectedTodo.title,
                    description: value,
                    index: this.state.selectedTodo.index
                }})
        }
    };

    handlingSubmit = (action) =>{
        this.setState({openCreateTodo: false});
        if(action === "Create"){
            (async () => {
                fetch('/addTodo', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({title: this.state.title, description: this.state.description})
                }).then(res => res.json()).then(response => {
                    this.handleCloseDialogAndRefresh();
                });

            })();
        }else if(action === "Update"){
            (async () => {
                fetch(`/updateTodo/${this.state.selectedTodo.index}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({title: this.state.selectedTodo.title, description: this.state.selectedTodo.description})
                }).then(res => res.json()).then(response => {
                    this.handleCloseDialogAndRefresh();
                });

            })();
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <CreateTodo open={this.state.openCreateTodo}
                            close={this.handleDialogCreateTodoClose}
                            refresh={this.handleCloseDialogAndRefresh}
                            sendButtonTitle={this.state.sendButtonTitle}
                            selectedTodo={this.state.selectedTodo}
                            onChange={this.onDialogTextFormChange}
                            submit={this.handlingSubmit}/>
                <Button className={classes.createTodoButton} onClick={() => this.createTodo("Create")}>Create To
                    do</Button>

                {this.state.todos.map((todo, index) => <div key={index}>
                    {console.log(index)}
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
                            <Button size="small" onClick={() => this.createTodo("Update", index)}>Update</Button>
                            <Button size="small" onClick={() => this.deleteTodo(index)}>Delete</Button>
                        </CardActions>
                    </Card>
                </div>)}

            </div>
        );
    }


}

export default withStyles(styles)(ToDos);
