import React, {Component} from 'react';
import {string, number, func} from 'prop-types';
import {connect} from 'react-redux';

import ProfileForm from 'Components/settings/ProfileForm'

import {editUser} from 'Actions/auth-actions'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.handleUserEdit = this.handleUserEdit.bind(this);
    }

    handleUserEdit({name, photo, dateOfBirth}) {
        const {
            userId,
            editUser
        } = this.props;

        editUser({userId, name, photo, dateOfBirth});
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

ProfilePage.propTypes = {
    userName: string,
    dateOfBirth: number,
    editUser: func
};

const mapStateToProps = ({auth: {name: userName, id: userId, dateOfBirth}}) => ({
    userId,
    userName,
    dateOfBirth
});

const mapDispatchToProps = (dispatch) => ({
    editUser: ({userId, name, photo, dateOfBirth}) => dispatch(editUser({userId, name, photo, dateOfBirth}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
