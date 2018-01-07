import React, { Component } from 'react';
import { string, number, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthController from 'Components/hoc/AuthController';
import AvatarForm from 'Components/settings/AvatarForm';
import ProfileForm from 'Components/settings/ProfileForm';

import {
  callEditUser,
  callLoadAvatar
} from 'Actions/user-actions'

class ProfilePage extends Component {
  handleAvatarEdit = ({ photo }) => {
    const {
      user: {
        _id
      },
      loadAvatar
    } = this.props;

    loadAvatar({ _id, photo });
  };

  handleUserEdit = ({ name, dateOfBirth }) => {
    const {
      user: {
        _id
      },
      editUser
    } = this.props;

    editUser({ _id, name, dateOfBirth });
  };

  render() {
    const {
      props: {
        user: {
          name,
          dateOfBirth,
          avatar
        }
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
            onSubmit={handleAvatarEdit}
            avatar={avatar}
          />
          <hr/>
          <ProfileForm
            initialValues={{
              name,
              dateOfBirth,
              avatar
            }}
            handleUserEdit={handleUserEdit}
          />
        </div>
      </section>
    );
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

const mapDispatchToProps = dispatch => bindActionCreators({
  editUser: ({ _id, name, dateOfBirth }) => callEditUser({ _id, name, dateOfBirth }),
  loadAvatar: ({ _id, photo }) => callLoadAvatar({ _id, photo })
}, dispatch);

export default AuthController(connect(null, mapDispatchToProps)(ProfilePage), Placeholder);
