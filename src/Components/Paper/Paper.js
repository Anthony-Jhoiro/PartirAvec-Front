import React from 'react';
import './Paper.scss';
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Paper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentScrollPosition: 0,
            lastScrollTop: 0,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolore doloremque hic libero maxime quaerat velit. Ad consequuntur earum explicabo hic, itaque magni necessitatibus nemo quae sequi, veritatis voluptate voluptatibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur eum itaque voluptas. Alias consectetur eius facilis hic molestiae nihil omnis qui rerum, velit voluptas? Exercitationem id optio provident ullam voluptate.',
            title: 'Title',
            imageList: [
                '/images/1.jpg',
                '/images/2.jpg',
                '/images/3.jpg'
            ],
            activeImageIndex: 0
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.previousImage= this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
    }

    // Form
    handleChanges(event) {
        console.log(event.target)
        if (event.target.name === 'text') {
            this.setState({text : event.target.value});
        } else if (event.target.name === 'title') {
            this.setState({title : event.target.value});
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

    getImageList()  {
        return this.state.imageList.map((image, i) => {
            console.log(i);
            return <img key={i} className={`carousel-image ${(this.state.activeImageIndex === i)? "active" : ""} `} src={image} alt={"introuvable"}/>
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
                        <input className="title" value={this.state.title} onChange={this.handleChanges} name={'title'}/>
                        <div className="content">
                            <textarea className="text" id="text" spellCheck="false" onScroll={e => this.textScroll(e)} onChange={this.handleChanges}
                                      value={this.state.text} name={'text'}
                            />
                            <div className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt}/> Bruges, Belgique
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
