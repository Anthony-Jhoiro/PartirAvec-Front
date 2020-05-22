import React, {Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import MapPage from "./Pages/MapPage";



class App extends React.Component{

  render() {

    return (
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Redirect exact from="/" to="home" />
                <Route path={'/home'} component={MainPage}/>
              <Route path={'/map'} component={MapPage}/>
            </Switch>
          </Suspense>
        </BrowserRouter>
    );
  }
}

export default App;
