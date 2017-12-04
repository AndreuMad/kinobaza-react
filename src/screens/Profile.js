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
      user: {
        _id
      },
      loadAvatar
    } = this.props;

    loadAvatar({_id, photo});
  }

  handleUserEdit({name, dateOfBirth}) {
    const {
      user: {
        _id
      },
      editUser
    } = this.props;

    editUser({_id, name, dateOfBirth});
  }

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
            handleAvatarEdit={handleAvatarEdit}
            avatar={avatar}
          />
          <hr/>
          <ProfileForm
            initialValues={{
              name: name,
              dateOfBirth,
              avatar
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

const mapDispatchToProps = (dispatch) => ({
  editUser: ({_id, name, dateOfBirth}) => dispatch(editUser({_id, name, dateOfBirth})),
  loadAvatar: ({_id, photo}) => dispatch(loadAvatar({_id, photo}))
});

export default AuthController(connect(null, mapDispatchToProps)(ProfilePage), Placeholder);
