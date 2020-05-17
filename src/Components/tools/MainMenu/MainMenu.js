import React, {useState} from 'react';
import './MainMenu.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faTimes, faPlus, faBook, faSignOutAlt, faMap} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import keycloakService from "../../../Services/keycloakService";

function MainMenu() {

    const [open, setOpen] = useState(false)

    return (
        <nav className={`main-menu ${open ? 'open' : 'close'}`}>
            <button onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={open ? faTimes : faBars}/>
            </button>
            {/*Return to map*/}
            <Link to={"/map"}>
                <FontAwesomeIcon icon={faMap}/>
            </Link>
            {/*Add*/}
            <Link to={"/map/new"}>
                <FontAwesomeIcon icon={faPlus}/>
            </Link>

            {/*open book*/}
            <Link to={"/"}>
                <FontAwesomeIcon icon={faBook}/>
            </Link>
            {/*Logout*/}
            <button onClick={() => keycloakService.logout()}>
                <FontAwesomeIcon icon={faSignOutAlt}/>
            </button>
        </nav>
    )
}

export default MainMenu;
