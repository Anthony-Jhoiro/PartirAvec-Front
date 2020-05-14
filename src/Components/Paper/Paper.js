import React from 'react';
import './Paper.scss';
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Geocode from "react-geocode";

class Paper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentScrollPosition: 0,
            lastScrollTop: 0,
            text: '',
            title: '',
            imageList: [
                '/images/1.jpg',
                '/images/2.jpg',
                '/images/3.jpg'
            ],
            activeImageIndex: 0,
            placeTimeout: null,
            place: ''
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
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
                    Geocode.fromAddress(this.state.place).then(
                        response => {
                            console.log(response);
                        },
                        error => {
                            console.error(error);
                        }
                    )
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

    getImageList() {
        return this.state.imageList.map((image, i) => {
            return <img key={i} className={`carousel-image ${(this.state.activeImageIndex === i) ? "active" : ""} `}
                        src={image} alt={"introuvable"}/>
        })
    }

    nextImage() {
        if (this.state.activeImageIndex === this.state.imageList.length - 1) {
            this.setState({activeImageIndex: 0});
        } else {
            this.setState({activeImageIndex: this.state.activeImageIndex + 1});
        }
    }

    previousImage() {
        if (this.state.activeImageIndex === 0) {
            this.setState({activeImageIndex: this.state.imageList.length - 1});
        } else {
            this.setState({activeImageIndex: this.state.activeImageIndex - 1});
        }
    }

    render() {
        return (
            <div className="pile">
                <div className="paper">
                    <div className="lines">
                        <input className="title" value={this.state.title} onChange={this.handleChanges} name={'title'} placeholder={'Titre'}/>
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
                            <div className="carousel">
                                <b className="carousel-icon left" onClick={this.previousImage}>{"<"}</b>
                                <div className="image-container">
                                    {this.getImageList()}
                                </div>
                                <b className="carousel-icon right" onClick={this.nextImage}>{">"}</b>
                            </div>

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
