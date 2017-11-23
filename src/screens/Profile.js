import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileForm from 'Components/settings/ProfileForm'

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
                    <ProfileForm />
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ auth: { name: userName } }) => ({
    userName
});

export default connect(mapStateToProps)(ProfilePage);
