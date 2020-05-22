import React from 'react';
import '../Paper/Paper.scss';
import './LoginForm.scss'
import keycloakService from "../../Services/keycloakService";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            redirect: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(input) {
        if (input.target.name === 'login') {
            this.setState({login: input.target.value})
        } else if (input.target.name === 'password') {
            this.setState({password: input.target.value})
        }
    }

    getValidButton() {
        if (this.state.login.length > 0 && this.state.password.length > 0) {
            return (
                <button className="submit-btn" onClick={() => this.login()}>
                    Valider
                </button>
            )
        }
    }
    login() {
        keycloakService.login(this.state.login, this.state.password,
            () => {
                this.props.history.push('/map');
            },
            () => {
            console.error("An error occurred");
            })

    }

    redirect() {
        if (this.state.redirect != null) {
            return <Redirect to={this.state.redirect}/>
        }
        return '';
    }


    render() {
        return <div className="pile">
            {this.redirect()}
            <div className="paper">
                <div className="lines">
                    <h1 className={'title'}>Connexion</h1>
                    <div className="content">
                        <div className="login-form">
                            <p>Nom d'utilisateur</p>
                            <input className={'mt-1'} type="text" name={'login'} placeholder={'Nom d\'utilisateur'} onChange={this.handleChange}/>
                            <p className={'mt-1'}>Mot de passe</p>
                            <input className={'mt-1'} type="password" name={'password'} placeholder={'Mot de passe'} onChange={this.handleChange}/>
                            {this.getValidButton()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default LoginForm;
