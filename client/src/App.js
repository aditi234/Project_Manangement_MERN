import SignUp from './components/SignUp';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Project from './components/Project';
import ToDoList from './components/ToDoList';
import SearchBar from './components/SearchBar';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <SignUp />
            )}
          />
          <Route
            path="/login"
            exact
            component={() => (
              <Login />
            )}
          />
          <Route
            path="/project"
            exact
            component={() => (
              <Project />
            )}
          />
          <Route
            path="/todo"
            exact
            component={() => (
              <ToDoList  />
            )}
          />
          <Route
            path="/search"
            exact
            component={() => (
              <SearchBar  />
            )}
          />
          <Route
            path={`/project/:id`}
            exact
            component={()=>(
              <Tasks />
            )}
           />
           
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
