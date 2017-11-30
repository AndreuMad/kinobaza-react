import React, {Component} from 'react';
import {string, number, func} from 'prop-types';
import {connect} from 'react-redux';

import AuthController from 'Components/hoc/AuthController';
import AvatarForm from 'Components/settings/AvatarForm';
import ProfileForm from 'Components/settings/ProfileForm';

import {
    editUser,
    loadAvatar
} from 'Actions/user-actions'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.handleAvatarEdit = this.handleAvatarEdit.bind(this);
        this.handleUserEdit = this.handleUserEdit.bind(this);
    }

    handleAvatarEdit({photo}) {
        const {
            userId,
            loadAvatar
        } = this.props;

        loadAvatar({userId, photo});
    }

    handleUserEdit({name, dateOfBirth}) {
        const {
            userId,
            editUser
        } = this.props;

        editUser({userId, name, dateOfBirth});
    }

    render() {
        const {
            props: {
                userName,
                dateOfBirth
            },
            handleAvatarEdit,
            handleUserEdit
        } = this;

        return (
            <section className="settings-page">
                <div className="container">
                    <h1>Редагувати профіль</h1>
                    <hr/>
                    <AvatarForm
                        handleAvatarEdit={handleAvatarEdit}
                    />
                    <hr/>
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

const Placeholder = () => (
    <span>Будь-ласка, залогіньтесь</span>
);

ProfilePage.propTypes = {
    userId: string,
    userName: string,
    dateOfBirth: number,
    editUser: func,
    loadAvatar: func
};

const mapStateToProps = ({auth: {name: userName, id: userId, dateOfBirth}}) => ({
    userId,
    userName,
    dateOfBirth
});

const mapDispatchToProps = (dispatch) => ({
    editUser: ({userId, name, dateOfBirth}) => dispatch(editUser({userId, name, dateOfBirth})),
    loadAvatar: ({userId, photo}) => dispatch(loadAvatar({userId, photo}))
});

export default AuthController(connect(mapStateToProps, mapDispatchToProps)(ProfilePage), Placeholder);
