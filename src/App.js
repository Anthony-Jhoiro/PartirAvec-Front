import React from 'react';
import './App.scss';
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";
import {NouvelleDestination} from "./Components/NouvelleDestination";
import {Map} from "./Components/Map";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <nav className="neumorphic-nav">
          <h1>Carte</h1>
          <Link to="/destination/new" className="nav-link">Nouvelle destination</Link>
          <label htmlFor="blurFilter">Blur</label>
          <input type="checkbox" name="" id="blurFilter" hidden />
        </nav>

          <Switch>
            <Route path={"/destination/new"}><NouvelleDestination/></Route>
          </Switch>
          </BrowserRouter>

      </header>
      <Map/>
    </div>
  );
}

export default App;
