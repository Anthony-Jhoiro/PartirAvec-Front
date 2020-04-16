import React from 'react';

export class NouvelleDestination extends React.Component {
    render() {
        return (
            <div>
                <div className="card neumorphic-up center">
                    <input type="text" name="" placeholder="Login" id=""/>
                    <input type="password" name="" placeholder="Password" id=""/>
                    <button className="btn-neumorphic btn-icon"><i className="fas fa-plane"/></button>
                    <div className="radio-icon">
                        <input type="radio" name="radio" id="radio_1"/>
                        <label htmlFor="radio_1" className="btn-neumorphic btn-icon"><i
                            className="fas fa-plane"/></label>
                    </div>
                    <div className="radio-icon">
                        <input type="radio" name="radio" id="radio_2"/>
                        <label htmlFor="radio_2" className="btn-neumorphic btn-icon"><i
                            className="fas fa-plane"/></label>
                    </div>
                    <div className="radio-icon">
                        <input type="radio" name="radio" id="radio_3"/>
                        <label htmlFor="radio_3" className="btn-icon active"><i
                            className="fas fa-plane"/></label>
                    </div>
                </div>
            </div>
        );
    }

}
