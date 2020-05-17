import React from 'react';
import './Paper.scss';
import {faMapMarkerAlt, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Geocode from "react-geocode";
import httpService from "../../Services/httpService";
import Carousel from "../Carousel/Carousel";

class Paper extends React.Component {

    constructor(props) {
        super(props);
        // starting state
        this.state = {
            currentScrollPosition: 0,
            lastScrollTop: 0,
            text: '',
            title: '',
            imageList: [],
            placeTimeout: null,
            place: '',
            formValid: false,
        }

        // Bind this for methods used in template
        this.handleChanges = this.handleChanges.bind(this);

    }

    // Form
    handleChanges(event) {

        if (event.target.name === 'text') {
            this.setState({text: event.target.value});
        } else if (event.target.name === 'title') {
            this.setState({title: event.target.value});
        } else if (event.target.name === 'place') {

            clearTimeout(this.state.placeTimeout);
            this.setState({
                placeTimeout: setTimeout(() => {
                    if (this.state.place === null || this.state.place === "") return;
                    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY);
                    Geocode.setLanguage("fr");
                    // TODO :  enable in prod
                    //     Geocode.fromAddress(this.state.place).then(
                    //         response => {
                    //             console.log(response);
                    //         },
                    //         error => {
                    //             console.error(error);
                    //         }
                    //     )
                }, 1000),
                place: event.target.value
            });
        }
    }

    // Text
    textScroll(e) {
        const unit = 1.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);

        let currentPosition = e.target.scrollTop;

        if (currentPosition > this.state.lastScrollTop) {
            // On descend
            e.target.scrollTop = this.state.lastScrollTop + unit;

        } else if (currentPosition < this.state.lastScrollTop) {
            // On monte
            e.target.scrollTop = this.state.lastScrollTop - unit;

        }
        this.setState({
            lastScrollTop: e.target.scrollTop
        });
    }

    getValidButton() {
        if (this.state.text.length > 0
            && this.state.title.length > 0
            && this.state.place.length > 0) {

            if (!this.state.formValid) this.setState({formValid: true});

            return <button className={'button-valid'}><FontAwesomeIcon icon={faCheck}/></button>
        } else {
            if (this.state.formValid) {
                this.setState({formValid: false});
            }
            return '';
        }
    }

    render() {
        return (
            <div className="pile">
                <div className="paper">
                    {this.getValidButton()}
                    <div className="lines">
                        <input className="title" value={this.state.title} onChange={this.handleChanges} name={'title'}
                               placeholder={'Titre'}/>
                        <div className="content">
                            <textarea className="text" id="text" spellCheck="false" onScroll={e => this.textScroll(e)}
                                      onChange={this.handleChanges}
                                      value={this.state.text} name={'text'}
                                      placeholder={'Que souhaites-tu raconter ?'}
                            />
                            <div className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                <input type="text" className="place-input" name={'place'} value={this.state.place}
                                       onChange={this.handleChanges} placeholder={'Où ?'}/>
                            </div>

                            <Carousel imageList={this.state.imageList} />

                        </div>

                    </div>
                    <div className="holes hole-top"/>
                    <div className="holes hole-middle"/>
                    <div className="holes hole-bottom"/>
                </div>

                <div className="paper"/>
                <div className="paper"/>
            </div>);
    }
}

export default Paper;
