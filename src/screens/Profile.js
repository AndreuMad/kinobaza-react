import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImageUpload from 'Components/formComponents/ImageUpload';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: ''
        }
    }

    render() {
        const {
            userName
        } = this.props;

        return (
            <section className="settings-page">
                <div className="container">
                    <h1>Редагувати профіль</h1>
                    <hr/>
                    <h3>Аватарка</h3>
                    <ImageUpload
                        label="Завантажте аватарку"
                        name="photo"
                        onChange={res => this.setState({ imageUrl: res })}
                    />
                    <hr/>
                    <h3>Ім'я профілю</h3>
                    <p>{userName}</p>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ auth: { name: userName } }) => ({
    userName
});

export default connect(mapStateToProps)(ProfilePage);
