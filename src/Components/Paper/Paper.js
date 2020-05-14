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

    render() {
        return (
            <div className="pile">
                <div className="paper">
                    <div className="lines">
                        <input className="title" value={'title'} />
                        <div className="content">
                            <textarea className="text" id="text" spellCheck="false" onScroll={e => this.textScroll(e)} >
                                            You can edit this text!
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.
            Cupcake ipsum dolor sit amet liquorice fruitcake. Candy canes jelly beans sweet roll cupcake lollipop.
            Powder
            carrot cake toffee brownie. Marshmallow sweet roll donut. Chocolate cake apple pie candy canes tiramisu
            dragée
            wafer. Croissant cookie lemon drops tiramisu jelly-o donut. Sweet gummi bears ice cream.


                            </textarea>
                            <div className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt}/> Bruges, Belgique
                            </div>
                            <div className="carousel">
                                <b className="carousel-icon left">{"<"}</b>
                                <div className="image-container">
                                    <img className="carousel-image active" src="/images/1.jpg" alt="1.jpg"/>
                                    <img className="carousel-image" src="/images/2.jpg" alt="1.jpg"/>
                                    <img className="carousel-image" src="/images/3.jpg" alt="1.jpg"/>
                                </div>
                                <b className="carousel-icon right">{">"}</b>
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
