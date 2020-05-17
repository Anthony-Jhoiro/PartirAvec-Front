import React, {Component} from "react";
import {Map} from "../Components/Map";
import Spinner from "../Components/tools/Spinner/Spinner";
import MainMenu from "../Components/tools/MainMenu/MainMenu";
import {BrowserRouter, Route} from "react-router-dom";
import Paper from "../Components/Paper/Paper";
import keycloakService from "../Services/keycloakService";
import httpService from "../Services/httpService";
import './MapPage.scss';


class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {keycloak: null, authenticated: false};
    }

    componentDidMount() {
        keycloakService.initKeycloak((authenticated) => {
            this.setState({ authenticated: authenticated });
            httpService.configure();
            httpService.getAxiosClient().get("http://localhost:10100/destinationservice/countries")
            httpService.getAxiosClient().post("http://localhost:10100/destinationservice/destination", {
                "title": "coucoucoucou",
                "text": "lorem ipsum",
                "location": "location",
                "images": [
                    "img1.png",
                    "img2.jpg"
                ],
                "country": {
                    "name": "Germany",
                    "code": "DE"

                }
            })

        });
        // const keycloak = Keycloak("/keycloak.json");
        // keycloak.init({onLoad: 'login-required'}).then(authenticated => {
        //     axios.get("http://localhost:10100/destinationservice/countries", {
        //         headers: {
        //             Authorization: 'Bearer ' + keycloak.token
        //         }
        //     }).then(console.log);
        //     this.setState({ keycloak: keycloak, authenticated: authenticated });
        //
        // });


    }

    logout() {
        this.state.keycloak.logout();
    }

    render() {
        if (this.state.authenticated) {
            return (
                <main>
                    <Map disable={false}/>
                    <BrowserRouter>
                        <MainMenu/>
                        <Route path={'/map/new'} component={Paper}/>
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
