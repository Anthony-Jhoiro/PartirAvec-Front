import React from 'react';
import '../Paper/Paper.scss';
import {Link} from "react-router-dom";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class Book extends React.Component {
    render() {
        return (
            <div className="pile">
                <div className="paper">
                    <div className="lines">
                        <h1 className="title">Sommaire</h1>
                        <div className="content">

                            <div className="summary h-16">
                                <ul>
                                    <li><b className={'icon'}><FontAwesomeIcon icon={faPaperPlane} /></b> <Link to={'/map/destination/1'}> Destination 1 : Lille, France</Link></li>
                                    <li><b className={'icon'}><FontAwesomeIcon icon={faPaperPlane} /></b> <Link to={'/map/destination/1'}> Destination 1 : Lille, France</Link></li>
                                    <li><b className={'icon'}><FontAwesomeIcon icon={faPaperPlane} /></b> <Link to={'/map/destination/1'}> Destination 1 : Lille, France</Link></li>
                                    <li><b className={'icon'}><FontAwesomeIcon icon={faPaperPlane} /></b> <Link to={'/map/destination/1'}> Destination 1 : Lille, France</Link></li>
                                    <li><b className={'icon'}><FontAwesomeIcon icon={faPaperPlane} /></b> <Link to={'/map/destination/1'}> Destination 1 : Lille, France</Link></li>
                                    <li><b className={'icon'}><FontAwesomeIcon icon={faPaperPlane} /></b> <Link to={'/map/destination/1'}> Destination 1 : Lille, France</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="paper"/>
                <div className="paper"/>
            </div>
        )
    }
}

export default Book;
