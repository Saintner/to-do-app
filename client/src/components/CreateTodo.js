import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CreateTodoDialog extends React.Component {

    getTodoInfo = (key) =>{
        return this.props.selectedTodo[key];
    };

    state = {
        title: "",
        description:"",
        index:""
    };

    createTodo = () => {
        if(this.props.selectedTodo.title !== "" && this.props.selectedTodo.description !== ""){
            this.props.submit(this.props.sendButtonTitle)
        }
    };

    handleClose = () => {
        this.props.close();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.props.sendButtonTitle} Todo</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value={this.props.selectedTodo.title}
                            onChange={event => this.props.onChange("title",event.target.value)}
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={this.props.selectedTodo.description}
                            onChange={event => this.props.onChange("description",event.target.value)}
                            multiline={true}
                            margin="dense"
                            id="name"
                            label="Description"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.createTodo()} color="primary">
                            {this.props.sendButtonTitle}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
