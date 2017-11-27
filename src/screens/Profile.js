import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ProfileForm from 'Components/settings/ProfileForm'

import {editUser} from 'Actions/auth-actions'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.handleUserEdit = this.handleUserEdit.bind(this);
    }

    handleUserEdit({name, dateOfBirth}) {
        const {
            editUser
        } = this.props;

        editUser({name, dateOfBirth});
    }

    render() {
        const {
            props: {
                userName,
                dateOfBirth
            },
            handleUserEdit
        } = this;

        return (
            <section className="settings-page">
                <div className="container">
                    <ProfileForm
                        initialValues={{
                            name: userName,
                            dateOfBirth
                        }}
                        handleUserEdit={handleUserEdit}
                    />
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({auth: {name: userName, dateOfBirth}}) => ({
    userName,
    dateOfBirth
});

const mapDispatchToProps = (dispatch) => ({
    editUser: ({name, dateOfBirth}) => dispatch(editUser({name, dateOfBirth}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
