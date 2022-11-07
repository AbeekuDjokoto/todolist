import Home from "./Home/Home";
import NavigationBar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar/>
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
