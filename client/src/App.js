import React, {Component} from 'react';
import Login from './components/Login';
import NavBar from './components/NavBar';
import ToDos from './components/toDos';
import {Route} from "react-router-dom";
import {Redirect} from "react-router";
import './App.css';

const DEFAULT_PAGE = "/";

class App extends Component {
  state = {
    isLogged: false,
    user:{},
    currentPage: DEFAULT_PAGE
  };


    setCurrentPage = (currentPage) => {
        this.setState({currentPage});
    };

    navigateTo = (page) => {
        this.setCurrentPage(page);
        this.props.history.push(page);
    };

  hasLogged = (hasLogged) =>{
    if (hasLogged){
      this.setState({isLogged: true})
    }
  };

  render() {
    return (
      <div className="App">
          <NavBar isLogged={this.state.isLogged}
                  navigateTo={this.navigateTo}/>
          <div>
              <Route exact
                     path="/"
                     render={() =>
                         (!this.state.isLogged) ?
                             <Redirect to="/login"/> :
                             <ToDos/>
                     }
              />
              <Route exact
                     path="/login"
                     render={route =>
                         <Login route={route}
                                user={this.state.user}
                                hasLogged={this.hasLogged}
                          />
                     }
              />
          </div>

      </div>
    );
  }
}

export default App;
