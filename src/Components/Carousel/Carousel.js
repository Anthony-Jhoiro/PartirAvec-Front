import React from 'react';
import './Carousel.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCameraRetro, faTimes} from "@fortawesome/free-solid-svg-icons";
import httpService from "../../Services/httpService";
import ImagePicker from "../ImagePicker/ImagePicker";

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeImagePicker: false,
            activeImageIndex: 0
        }

        this.previousImage = this.previousImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.handleImages = this.handleImages.bind(this);
        this.openImagePicker = this.openImagePicker.bind(this);
    }

    openImagePicker() {
        this.setState({activeImagePicker: true});
    }

    handleImages(data) {
        if (data.local) {
            const formData = new FormData();
            formData.append('file', data.file);
            let config = httpService.getConfig();
            config.headers['content-type'] = 'multipart/form-data'
            httpService.getAxiosClient().post(
                process.env.REACT_APP_UPLOAD_LOCATION + '/uploadservice',
                formData,
                config
            ).then((fileName) => {
                let lst =  this.props.imageList;
                lst.push(fileName.data);
                this.setState({
                    imageList: lst,
                    activeImagePicker: false
                });
            });
        }
        else {
            let lst =  this.props.imageList;
            lst.push(data.url);
            this.setState({
                imageList: lst,
                activeImagePicker: false
            });
        }
    }

    getImagePicker() {
        if (this.state.activeImagePicker) {
            return (<ImagePicker onSubmit={this.handleImages}/>);
        } else {
            return '';
        }
    }

    getImageList() {
        return this.props.imageList.map((image, i) => {
            return <img key={i} className={`carousel-image ${(this.state.activeImageIndex === i) ? "active" : ""} `}
                        src={image} alt={"introuvable"}/>
        })
    }

    nextImage() {
        if (this.state.activeImageIndex === this.props.imageList.length - 1) {
            this.setState({activeImageIndex: 0});
        } else {
            this.setState({activeImageIndex: this.state.activeImageIndex + 1});
        }
    }

    previousImage() {
        if (this.state.activeImageIndex === 0) {
            this.setState({activeImageIndex: this.props.imageList.length - 1});
        } else {
            this.setState({activeImageIndex: this.state.activeImageIndex - 1});
        }
    }

    render() {
        if (this.props.imageList.length > 0) {
            return (
                <div>

                    {this.getImagePicker()}
                    <div className="carousel">
                        <button className={'photo-icon'} onClick={this.openImagePicker}><FontAwesomeIcon icon={faCameraRetro}/></button>

                        <b className="carousel-icon left" onClick={this.previousImage}>{"<"}</b>
                        <div className="image-container">
                            <button className={'delete-image'}><FontAwesomeIcon icon={faTimes}/></button>
                            {this.getImageList()}
                        </div>
                        <b className="carousel-icon right" onClick={this.nextImage}>{">"}</b>
                    </div>
                </div>

            )
        } else {
            return (
                <div>

                    {this.getImagePicker()}
                    <button className={'big-photo-icon'} onClick={this.openImagePicker}><FontAwesomeIcon icon={faCameraRetro}/></button>
                </div>
            )
        }
    }
}

export default Carousel;
