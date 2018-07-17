const express = require('express');
const fs = require('fs');
let jsonData = require('./database.json');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/login', (req, res) => {
  const user = {userName: 'admin', password: '12345678'};
  let resp = {message: "Wrong",status:200};
  if (req.body.userName === user.userName && req.body.password === user.password){
    resp = {message:"Ok", status:200}
  }
  res.json(resp);
});

app.post('/addTodo',(req,res) =>{
    let database = jsonData;
    let newTodo = {
      title:req.body.title,
      description:req.body.description,
    };
    database.todos.push(newTodo);
    let data = JSON.stringify(database, null, 2);

    fs.writeFile("./database.json", data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.json(database);
});

app.put('/updateTodo/:index',(req,res) =>{
    let database = jsonData;
    let newTodo = {
        title:req.body.title,
        description:req.body.description,
    };
    database.todos[req.params.index]= newTodo;
    let data = JSON.stringify(database, null, 2);

    fs.writeFile("./database.json", data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.json(database);
});

app.get('/deleteTodo/:index', (req, res) => {
    let database = jsonData;
    let databaseDeleted = database.todos.splice(req.params.index,1);
    let data = JSON.stringify(database, null, 2);

    fs.writeFile("./database.json", data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    res.json(database);
});

app.get('/getTodos',(req,res) =>{

    let database = jsonData;
    /*console.log(database);
    let student = {
        name: 'Mike',
        age: 23,
        gender: 'Male',
        department: 'English',
        car: 'Honda'
    };
    let user = database.data[0].user;
    let data = JSON.stringify(student, null, 2);

    fs.writeFile("./database.json", data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });*/
    res.json(database);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);