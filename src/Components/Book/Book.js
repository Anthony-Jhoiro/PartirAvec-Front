import React from 'react';
import '../Paper/Paper.scss';
import {Link} from "react-router-dom";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import httpService from "../../Services/httpService";

const defaultImg = 'https://www.miki.co.uk/sites/MikiTravelGlobal/files/slider_One_final.jpg?1589673600073';
const resultNumber = 7;
class Book extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            img : defaultImg,
            pageNumber: 0,
            pageTotal: 0
        }
    }

    componentDidMount() {
        this.getPage(0)
    }

    getPage(nbPage) {
        httpService.getAxiosClient().get(process.env.REACT_APP_API_LOCATION+
            '/destinationservice/destinations?offset='+nbPage+'&limit='+resultNumber)

            .then(response => this.setState({
                data: response.data.content,
                pageNumber:nbPage,
                pageTotal: response.data.totalPages
            }));
    }

    setImage(destinationIndex) {
        if (this.state.data[destinationIndex].images.length > 0) {
            this.setState({img: this.state.data[destinationIndex].images[0]});
        } else {
            this.setState({img: defaultImg});
        }
    }

    getDestinationList() {
        let lst = [];
        this.state.data.forEach((d, i) => {
            lst.push(<li key={"dest_"+i} onMouseOver={() => this.setImage(i)}><b className={'icon'}><FontAwesomeIcon icon={faPaperPlane} /></b> <Link to={'/map/destination/'+d.id}>{d.title} : {d.location}</Link></li>)
        });
        return lst;
    }

    getLeftIcon() {
        if (this.state.pageNumber !== 0) {
            return <b className={'summary-icon left'} onClick={() => this.goLeftPage()}>{'<'}</b>;
        }
        return ''
    }

    getRightIcon() {
        if (this.state.pageNumber < this.state.pageTotal - 1) {
            return <b className={'summary-icon right'} onClick={() => this.goRightPage()}>{'>'}</b>;
        }
        return ''
    }

    goLeftPage() {
        if (this.state.pageNumber > 0) {
            this.getPage(this.state.pageNumber -1);
        }
    }

    goRightPage() {
        if (this.state.pageNumber < this.state.pageTotal - 1) {
            this.getPage(this.state.pageNumber + 1);
        }
    }

    render() {
        return (
            <div className="pile">
                <div className="paper">
                    <div className="lines">
                        <h1 className="title">Sommaire</h1>
                        <div className="content">
                            <div className="h-8 top-image">
                                <img src={this.state.img} alt={'not found'}/>
                            </div>

                            <div className="summary h-7 mt-1">
                                {this.getLeftIcon()}
                                <ul>
                                    {this.getDestinationList()}
                                </ul>
                                {this.getRightIcon()}
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
