import React, {Component} from "react";
import {Map} from "../Components/Map";
import Spinner from "../Components/tools/Spinner/Spinner";
import MainMenu from "../Components/tools/MainMenu/MainMenu";
import {BrowserRouter, Route} from "react-router-dom";
import Paper from "../Components/Paper/Paper";
import Book from "../Components/Book/Book";
import keycloakService from "../Services/keycloakService";
import httpService from "../Services/httpService";
import './MapPage.scss';

/**
 * Main component for all pages starting with /map
 */
class MapPage extends Component {
    constructor(props) {
        super(props);
        // Setup default state
        this.state = {keycloak: null, authenticated: false};
    }

    componentDidMount() {
        // Configure keycloak then configure axios and then access the app
        keycloakService.initKeycloak((authenticated) => {
            httpService.configure(() => {
                this.setState({ authenticated: authenticated });
            });
        });
    }

    render() {
        if (this.state.authenticated) {
            return (
                <main>
                    <Map/>
                    <BrowserRouter>
                        <MainMenu/>
                        <Route path={'/map/destination'} component={Paper}/>
                        <Route path={'/map/destination/:destId'} component={Paper}/>
                        <Route path={'/map/book'} component={Book}/>
                    </BrowserRouter>
                </main>
            );
        }
        return (
            <Spinner/>
        );
    }
}

export default MapPage;
