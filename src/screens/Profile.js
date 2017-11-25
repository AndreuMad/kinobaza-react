import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileForm from 'Components/settings/ProfileForm'

class ProfilePage extends Component {

    render() {
        const {
            userName,
            dateOfBirth
        } = this.props;

        return (
            <section className="settings-page">
                <div className="container">
                    <ProfileForm
                        initialValues={{
                            name: userName,
                            dateOfBirth
                        }}
                    />
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ auth: { name: userName, dateOfBirth } }) => ({
    userName,
    dateOfBirth
});

export default connect(mapStateToProps)(ProfilePage);
