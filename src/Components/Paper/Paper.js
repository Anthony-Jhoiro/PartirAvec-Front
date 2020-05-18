import React from 'react';
import './Paper.scss';
import {faMapMarkerAlt, faCheck, faBook} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Geocode from "react-geocode";
import httpService from "../../Services/httpService";
import Carousel from "../Carousel/Carousel";
import {Link} from "react-router-dom";

class Paper extends React.Component {

    constructor(props) {
        super(props);
        this.destId = this.props.match.params.destId;



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
            lng: -1,
            lat: -1,
            countryCode: ''
        }

        // Bind this for methods used in template
        this.handleChanges = this.handleChanges.bind(this);

    }

    componentDidMount() {
        if (this.destId) {
            httpService.getAxiosClient().get(process.env.REACT_APP_API_LOCATION+'/destinationservice/destination/'+this.destId)
                .then(response => {
                    const destination = response.data;
                    this.setState({
                        title: destination.title,
                        text: destination.text,
                        lat: destination.lat,
                        lng: destination.lng,
                        countryCode: destination.countryCode,
                        imageList: destination.images,
                        place: destination.location,
                    })
                })
        }
    }

    validPaper() {
        if (this.state.formValid) {
            httpService.getAxiosClient().post(process.env.REACT_APP_API_LOCATION+'/destinationservice/destination', {
                title: this.state.title,
                text: this.state.text,
                images: this.state.imageList,
                lng: this.state.lng,
                lat: this.state.lat,
                country: {
                    code: this.state.countryCode
                },
                location: this.state.place
            })
        }
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
                                // TODO : add locationOk to state (array more than 0 item)
                                const lat = response.results[0].geometry.location.lat;
                                const lng = response.results[0].geometry.location.lng;

                                // Find country code
                                let countryCode = "";
                                response.results[0].address_components.forEach(adressLine => {
                                    if (adressLine.types.indexOf("country") !== -1) {
                                        countryCode = adressLine.short_name;
                                    }
                                });
                                this.setState({
                                    lng: lng,
                                    lat: lat,
                                    countryCode: countryCode
                                })

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

    getValidButton() {
        if (this.destId == null) {
            if (this.state.text.length > 0
                && this.state.title.length > 0
                && this.state.place.length > 0
                && this.state.countryCode.length > 0) {
                if (!this.state.formValid) this.setState({formValid: true});
                return <button className={'button-valid'} onClick={() => this.validPaper()}><FontAwesomeIcon icon={faCheck}/></button>
            } else {
                if (this.state.formValid) {
                    this.setState({formValid: false});
                }
                return '';
            }
        }
    }

    getBackButton() {
        if (this.destId != null) {
            return <button className={'back-icon'}>
                <Link to={'/map/book'}>
                    <FontAwesomeIcon icon={faBook}/>
                </Link>
            </button>
        }
    }

    render() {
        return (
            <div className="pile">
                <div className="paper">
                    {this.getBackButton()}
                    {this.getValidButton()}
                    <div className="lines">
                        <input className="title" value={this.state.title} onChange={this.handleChanges} name={'title'}
                               placeholder={'Titre'} disabled={this.destId != null}/>
                        <div className="content">
                            <textarea className="text" id="text" spellCheck="false" onScroll={e => this.textScroll(e)}
                                      onChange={this.handleChanges}
                                      value={this.state.text} name={'text'}
                                      placeholder={'Que souhaites-tu raconter ?'}
                                      disabled={this.destId != null}
                            />
                            <div className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                <input type="text" className="place-input" name={'place'} value={this.state.place}
                                       onChange={this.handleChanges} placeholder={'Où ?'}
                                       disabled={this.destId != null}/>
                            </div>

                            <Carousel imageList={this.state.imageList} disable={this.destId != null}/>

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
