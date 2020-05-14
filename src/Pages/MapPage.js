import React, {Component} from "react";
import {Map} from "../Components/Map";
import Keycloak from 'keycloak-js';
import Spinner from "../Components/tools/Spinner/Spinner";
import MainMenu from "../Components/tools/MainMenu/MainMenu";
import {BrowserRouter, Route} from "react-router-dom";
import Paper from "../Components/Paper/Paper";


class MapPage extends Component{
    constructor(props) {
        super(props);
        this.state = { keycloak: null,authenticated: false };
    }

    componentDidMount() {
            const keycloak = Keycloak("/keycloak.json");
            keycloak.init({onLoad: 'login-required'}).then(authenticated => {
                this.setState({ keycloak: keycloak, authenticated: authenticated })
            });

    }

    logout() {
        this.state.keycloak.logout();
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <main>
                    <Map/>
                    <BrowserRouter>
                        <MainMenu/>
                        <Route path={'/map/new'} component={Paper} />
                    </BrowserRouter>
                </main>
            );
        else {
                return (<p>Unable to authenticate</p>)
            }
        }
        return (
            <Spinner/>
        );
    }
}

export default MapPage;
