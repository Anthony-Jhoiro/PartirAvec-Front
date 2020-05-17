import React from 'react';
import './ImagePicker.scss';

class ImagePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fromUrl: false,
            url: '',
            file: null
        }
        this.setFile = this.setFile.bind(this);
        this.setUrl = this.setUrl.bind(this);
        this.submit = this.submit.bind(this);
        this.openUrlTab =this.openUrlTab.bind(this);
        this.openFileSystemTab = this.openFileSystemTab.bind(this);
    }

    getActiveTab() {
        if (!this.state.fromUrl) {
            return (<div className={'tab from-file'}>
                <label htmlFor="local" className={'load-button'}>Charger</label>
                <input type="file" id="local" name="file" accept="image/png, image/jpeg" onChange={this.setFile}/>
                {(this.state.file)?<button onClick={this.submit}>Submit</button>:''}

            </div>)
        } else {
            return (<div className={'tab from-url'}>
                <label htmlFor="url">Url : </label>
                <input type="text" className="url" id="from-web" autoFocus={true} onChange={this.setUrl}/>
                {(this.state.url.length > 0)?<button onClick={this.submit}>Submit</button>:''}
            </div>)
        }
    }

    openUrlTab() {
        this.setState({ fromUrl: true });
    }

    openFileSystemTab() {
        this.setState({ fromUrl: false });
    }

    submit() {
        this.props.onSubmit({
            url: this.state.url,
            file: this.state.file,
            local: !this.state.fromUrl
        })
    }

    setFile(e) {
        this.setState({ file: e.target.files[0] });
    }

    setUrl(e) {
        this.setState({ url: e.target.value });
    }

    render() {
        return (<div className="etiquette center">
            <div className="lines">
                <h3>Ajouter une image</h3>
                <div className="head">
                    <span className={(this.state.fromUrl) ? '' : 'active'} onClick={this.openFileSystemTab}>Depuis un fichier</span>
                    <span className={(this.state.fromUrl) ? 'active' : ''} onClick={this.openUrlTab}>Depuis un url</span>
                </div>
                {this.getActiveTab()}
            </div>
        </div>)
    }
}

export default ImagePicker;
